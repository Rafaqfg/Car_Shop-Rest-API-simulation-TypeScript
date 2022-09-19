import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
const { expect } = chai;
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import MotorcyclesService from '../../../services/MotorcyclesService';
import MotorcyclesController from '../../../controllers/MotorcyclesController';
import { motorcycleMock, motorcycleMockWithId } from '../mocks/motorcyclesMocks';

describe('Test MotorcycleController', () => {
  const motorcycleModel = new MotorcyclesModel();
  const motorcycleService = new MotorcyclesService(motorcycleModel);
  const motorcyclesController = new MotorcyclesController(motorcycleService)

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'update').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('1. create method', () => {
    it('1.1 Should return an object and status 201 if success', async () => {
      req.body = motorcycleMock;
        await motorcyclesController.create(req, res);
        const statusStub = res.status as sinon.SinonStub
        const jsonStub = res.json as sinon.SinonStub
        expect(statusStub.calledWith(201)).to.be.true;
        expect(jsonStub.calledWith(motorcycleMockWithId)).to.be.true;
    })
  })

  describe('2. read method', () => {
    it('2.1 Should return an array of objects and status 200 if success', async () => {
      await motorcyclesController.read(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([motorcycleMockWithId])).to.be.true;
    })
  })
  
  describe('3. readOne method', () => {
    it('3.1 Should return an object and status 200 if success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcyclesController.readOne(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(motorcycleMockWithId)).to.be.true;
    })
  })

  describe('4. update method', () => {
    it('4.1 Should return an object and status 200 if success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = motorcycleMock;
      await motorcyclesController.update(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(motorcycleMockWithId)).to.be.true;
    })
  })

  describe('5. delete method', () => {
    it('5.1 Should return status 204 if success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcyclesController.delete(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.end as sinon.SinonStub
      expect(statusStub.calledWith(204)).to.be.true;
      expect(jsonStub.called);
    })
  })
});