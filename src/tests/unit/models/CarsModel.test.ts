import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarsModel from '../../../models/CarsModel';
import { carMock, carMockWithId } from '../mocks/carsMocks';
import { ErrorTypes } from '../../../errors/catalog';

describe('Test CarsModel', () => {
  const carsModel = new CarsModel();
  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves();
  });

  after(() => {
    sinon.restore();
  });

  describe('1. create method', () => {
    it('1.1 should return an object if success', async () => {
      const carCreated = await carsModel.create(carMock);
      expect(carCreated).to.be.deep.eq(carMockWithId);
    })
  });

  describe('2. read method', () => {
    it('2.1 Should return an array of object if success', async () => {
      const carsList = await carsModel.read();
      expect(carsList).to.be.deep.equal([carMockWithId]);
    })
  });

  describe('3. readOne method', () => {
    it('3.1 Should return an object if success', async () => {
      const car = await carsModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('3.2 Should throw an InvalidMongoId error if _id is wrong', async () => {
      let err: any;
      try {
        await carsModel.readOne('12345wrong_id');
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  });

  describe('4. update method', () => {
    it('4.1 Should return an object if success', async () => {
      const car = await carsModel.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('4.2 Should throw an InvalidMongoId error if _id is wrong', async () => {
      let err: any;
      try {
        await carsModel.update('12345wrong_id', carMock);
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  });

  describe('5. delete method', () => {
    it('5.1 Should delete if success', async () => {
      const carDeleted = await carsModel.delete(carMockWithId._id);
      expect(carDeleted).to.be.deep.equal(carMockWithId);
    })

    it('5.2 Should throw an InvalidMongoId error if _id is wrong', async () => {
      let err: any;
      try {
        await carsModel.delete('12345wrong_id');
      } catch (error) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    })
  });
});