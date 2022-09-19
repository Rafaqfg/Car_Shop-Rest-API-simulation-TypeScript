import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import { carMock, carMockWithId } from '../mocks/carsMocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Test CarsService', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);

  before(() => {
    sinon.stub(carsModel, 'create').resolves(carMockWithId);
    sinon.stub(carsModel, 'read').resolves([carMockWithId]);
    sinon.stub(carsModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carsModel, 'update')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon.stub(carsModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('1. create method', () => {
    it('1.1 Should return an object if success', async () => {
      const carCreated = await carsService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    })

    it('1.2 Should throw a zodError if body don\'t fit the requirements', async () => {
      let err: any;
      try {
        await carsService.create({} as any);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError)
    })
  });

  describe('2. read method', () => {
    it('2.1 Should return an array of object if success', async () => {
      const carsList = await carsService.read();
      expect(carsList).to.be.deep.equal([carMockWithId]);
    })
  });

  describe('3. readOne method', () => {
    it('3.1 Should return an object if success', async () => {
      const car = await carsService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('3.2 Should throw an EntityNotFound error if model don\'t return anything', async () => {
      let err: any;
      try {
        await carsService.readOne(carMockWithId._id);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });
  
  describe('4. update method', () => {
    it('4.1 Should return an object if success', async () => {
      const car = await carsService.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('4.2 Should throw a zodError if body don\'t fit the requirements', async () => {
      let err: any;
      try {
        await carsService.update(carMockWithId._id, {} as any);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError)
    })
    it('4.2 Should throw an EntityNotFound error if model don\'t return anything', async () => {
      let err: any;
      try {
        await carsService.update(carMockWithId._id, carMock);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

  describe('5. delete method', () => {
    it('5.1 Should delete if success', async () => {
      const carDeleted = await carsService.delete(carMockWithId._id);
      expect(carDeleted).to.be.deep.equal(carMockWithId);
    })

    it('5.2 Should throw an EntityNotFound error if model don\'t return anything', async () => {
      let err: any;
      try {
        await carsService.delete(carMockWithId._id);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    })
  });

})