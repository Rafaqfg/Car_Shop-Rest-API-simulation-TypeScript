import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import MotorcyclesService from '../../../services/MotorcyclesService';
import { motorcycleMock, motorcycleMockWithId } from '../mocks/motorcyclesMocks'

describe('Test MotorcyclesService', () => {
  const motorcyclesModel  = new MotorcyclesModel();
  const motorcyclesService = new MotorcyclesService(motorcyclesModel );

  before(() => {
    sinon.stub(motorcyclesModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcyclesModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcyclesModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(motorcyclesModel, 'update')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon.stub(motorcyclesModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('1. create method', () => {
    it('1.1 Should return an object if success', async () => {
      const motorcycleCreated = await motorcyclesService.create(motorcycleMock);
      expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
    })

    it('1.2 Should throw a zodError if body don\'t fit the requirements', async () => {
      let err: any;
      try {
        await motorcyclesService.create({} as any);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError)
    })
  });

  describe('2. read method', () => {
    it('2.1 Should return an array of object if success', async () => {
      const motorcyclesList = await motorcyclesService.read();
      expect(motorcyclesList).to.be.deep.equal([motorcycleMockWithId]);
    })
  });

  describe('3. readOne method', () => {
    it('3.1 Should return an object if success', async () => {
      const motorcycle = await motorcyclesService.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    })

    it('3.2 Should throw an EntityNotFound error if model don\'t return anything', async () => {
      let err: any;
      try {
        await motorcyclesService.readOne(motorcycleMockWithId._id);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });
  
  describe('4. update method', () => {
    it('4.1 Should return an object if success', async () => {
      const motorcycle = await motorcyclesService.update(motorcycleMockWithId._id, motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    })

    it('4.2 Should throw a zodError if body don\'t fit the requirements', async () => {
      let err: any;
      try {
        await motorcyclesService.update(motorcycleMockWithId._id, {} as any);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError)
    })
    it('4.2 Should throw an EntityNotFound error if model don\'t return anything', async () => {
      let err: any;
      try {
        await motorcyclesService.update(motorcycleMockWithId._id, motorcycleMock);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

  describe('5. delete method', () => {
    it('5.1 Should delete if success', async () => {
      const motorcycleDeleted = await motorcyclesService.delete(motorcycleMockWithId._id);
      expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockWithId);
    })

    it('5.2 Should throw an EntityNotFound error if model don\'t return anything', async () => {
      let err: any;
      try {
        await motorcyclesService.delete(motorcycleMockWithId._id);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

})