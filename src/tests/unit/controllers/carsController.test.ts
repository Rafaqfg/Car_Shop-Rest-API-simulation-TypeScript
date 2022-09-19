import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
const { expect } = chai;
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import { carMock, carMockWithId } from '../mocks/carsMocks';

describe('Test CarsController', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carMockWithId);
    sinon.stub(carsService, 'read').resolves([carMockWithId]);
    sinon.stub(carsService, 'readOne').resolves(carMockWithId);
    sinon.stub(carsService, 'update').resolves(carMockWithId);
    sinon.stub(carsService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('1. create method', () => {
    it('1.1 Should return an object and status 201 if success', async () => {
      req.body = carMock;
        await carsController.create(req, res);
        const statusStub = res.status as sinon.SinonStub
        const jsonStub = res.json as sinon.SinonStub
        expect(statusStub.calledWith(201)).to.be.true;
        expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('2. read method', () => {
    it('2.1 Should return an array of objects and status 200 if success', async () => {
      await carsController.read(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([carMockWithId])).to.be.true;
    })
  })
  
  describe('3. readOne method', () => {
    it('3.1 Should return an object and status 200 if success', async () => {
      req.params = { id: carMockWithId._id };
      await carsController.readOne(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('4. update method', () => {
    it('4.1 Should return an object and status 200 if success', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMock;
      await carsController.update(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('5. delete method', () => {
    it('5.1 Should return status 204 if success', async () => {
      req.params = { id: carMockWithId._id };
      await carsController.delete(req, res);
      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.end as sinon.SinonStub
      expect(statusStub.calledWith(204)).to.be.true;
      expect(jsonStub.called);
    })
  })
});