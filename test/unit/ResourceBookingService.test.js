/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test'
require('../../src/bootstrap')

const _ = require('lodash')
const expect = require('chai').expect
const sinon = require('sinon')
const models = require('../../src/models')
const service = require('../../src/services/ResourceBookingService')
const {
  bookingManagerUser, connectUser, topCoderUser,
  jobCandidateResponseBody, resourceBookingRequestBody,
  resourceBookingResponseBody, unexpected,
  partiallyUpdateResourceBookingRequestBody, fullyUpdateResourceBookingRequestBody
} = require('./common/testData')

const ResourceBooking = models.ResourceBooking

describe('resourceBooking service test', () => {
  describe('create resource booking test', () => {
    it('create resource booking with booking manager success ', async () => {
      const stubCreate = sinon.stub(ResourceBooking, 'create').callsFake(() => {
        return resourceBookingResponseBody
      })
      const entity = await service.createResourceBooking(bookingManagerUser, resourceBookingRequestBody)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stubCreate.calledOnce).to.be.true
      stubCreate.restore()
    })

    it('create resource booking with connect user success ', async () => {
      const stubCreate = sinon.stub(ResourceBooking, 'create').callsFake(() => {
        return resourceBookingResponseBody
      })
      const entity = await service.createResourceBooking(connectUser, resourceBookingRequestBody)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stubCreate.calledOnce).to.be.true
      stubCreate.restore()
    })

    it('create resource booking with topcoder user failed ', async () => {
      try {
        await service.createResourceBooking(topCoderUser, resourceBookingRequestBody)
      } catch (error) {
        expect(error.message).to.equal('You are not allowed to perform this action!')
      }
    })
  })

  describe('get resource booking test', () => {
    it('get resource booking with booking manager success', async () => {
      const stub = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return resourceBookingResponseBody
      })
      const entity = await service.getResourceBooking(bookingManagerUser, resourceBookingResponseBody.dataValues.id)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stub.calledOnce).to.be.true
      stub.restore()
    })

    it('get resource booking with connect user success', async () => {
      const stub = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return resourceBookingResponseBody
      })
      const entity = await service.getResourceBooking(connectUser, resourceBookingResponseBody.dataValues.id)
      expect(entity).to.deep.eql(_.omit(resourceBookingResponseBody.dataValues, ['memberRate']))
      expect(stub.calledOnce).to.be.true
      stub.restore()
    })

    it('get resource booking with topcoder user success', async () => {
      const stub = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return resourceBookingResponseBody
      })
      const entity = await service.getResourceBooking(topCoderUser, resourceBookingResponseBody.dataValues.id)
      expect(entity).to.deep.eql(_.omit(resourceBookingResponseBody.dataValues, ['customerRate']))
      expect(stub.calledOnce).to.be.true
      stub.restore()
    })

    it('get resource booking with resource booking not exist success', async () => {
      const stub = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return null
      })
      try {
        await service.getResourceBooking(bookingManagerUser, resourceBookingResponseBody.dataValues.id)
      } catch (error) {
        expect(error.message).to.equal(`ResourceBooking with id: ${resourceBookingResponseBody.dataValues.id} doesn't exists.`)
        expect(stub.calledOnce).to.be.true
        stub.restore()
      }
    })
  })

  describe('fully update resource booking test', () => {
    it('fully update resource booking test with booking manager success', async () => {
      const stubResourceBookingFindOne = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return {
          ...resourceBookingResponseBody,
          update: () => { return null }
        }
      })
      const entity = await service.fullyUpdateResourceBooking(bookingManagerUser, resourceBookingResponseBody.dataValues.id, fullyUpdateResourceBookingRequestBody)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stubResourceBookingFindOne.calledOnce).to.be.true
      stubResourceBookingFindOne.restore()
    })

    it('fully update resource booking test with connect user success', async () => {
      const stubResourceBookingFindOne = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return {
          ...resourceBookingResponseBody,
          update: () => { return null }
        }
      })
      const entity = await service.fullyUpdateResourceBooking(connectUser, resourceBookingResponseBody.dataValues.id, fullyUpdateResourceBookingRequestBody)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stubResourceBookingFindOne.calledOnce).to.be.true
      stubResourceBookingFindOne.restore()
    })

    it('fully update resource booking test with topcoder user failed', async () => {
      try {
        await service.fullyUpdateResourceBooking(topCoderUser, resourceBookingResponseBody.dataValues.id, fullyUpdateResourceBookingRequestBody)
        unexpected()
      } catch (error) {
        expect(error.message).to.equal('You are not allowed to perform this action!')
      }
    })
  })

  describe('partially update resource booking test', () => {
    it('partially update resource booking test with booking manager success', async () => {
      const stubResourceBookingFindOne = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return {
          ...resourceBookingResponseBody,
          update: () => { return null }
        }
      })
      const entity = await service.partiallyUpdateResourceBooking(bookingManagerUser, resourceBookingResponseBody.dataValues.id, partiallyUpdateResourceBookingRequestBody)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stubResourceBookingFindOne.calledOnce).to.be.true
      stubResourceBookingFindOne.restore()
    })

    it('partially update resource booking test with connect user success', async () => {
      const stubResourceBookingFindOne = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return {
          ...resourceBookingResponseBody,
          update: () => { return null }
        }
      })
      const entity = await service.partiallyUpdateResourceBooking(connectUser, resourceBookingResponseBody.dataValues.id, partiallyUpdateResourceBookingRequestBody)
      expect(entity).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stubResourceBookingFindOne.calledOnce).to.be.true
      stubResourceBookingFindOne.restore()
    })

    it('partially update resource booking test with topcoder user failed', async () => {
      try {
        await service.partiallyUpdateResourceBooking(topCoderUser, resourceBookingResponseBody.dataValues.id, partiallyUpdateResourceBookingRequestBody)
        unexpected()
      } catch (error) {
        expect(error.message).to.equal('You are not allowed to perform this action!')
      }
    })
  })

  describe('delete resource booking test', () => {
    it('delete resource booking test with booking manager success', async () => {
      const stubResourceBookingFindOne = sinon.stub(ResourceBooking, 'findOne').callsFake(() => {
        return {
          ...resourceBookingResponseBody,
          update: () => { return null }
        }
      })
      await service.deleteResourceBooking(bookingManagerUser, resourceBookingResponseBody.dataValues.id)
      expect(stubResourceBookingFindOne.calledOnce).to.be.true
      stubResourceBookingFindOne.restore()
    })

    it('delete resource booking test with connect user failed', async () => {
      try {
        await service.deleteResourceBooking(connectUser, resourceBookingResponseBody.dataValues.id)
        unexpected()
      } catch (error) {
        expect(error.message).to.equal('You are not allowed to perform this action!')
      }
    })

    it('delete resource booking test with topcoder user failed', async () => {
      try {
        await service.deleteResourceBooking(topCoderUser, jobCandidateResponseBody.dataValues.id)
        unexpected()
      } catch (error) {
        expect(error.message).to.equal('You are not allowed to perform this action!')
      }
    })
  })

  describe('search resource booking test', () => {
    it('search resource booking success', async () => {
      const stub = sinon.stub(ResourceBooking, 'findAndCountAll').callsFake(() => {
        return {
          count: 1,
          rows: [resourceBookingResponseBody]
        }
      })
      const entity = await service.searchResourceBookings({ sortBy: 'id', sortOrder: 'asc', page: 1, perPage: 1 })
      expect(entity.result[0]).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stub.calledOnce).to.be.true
      stub.restore()
    })

    it('search resource booking without query parameters success', async () => {
      const stub = sinon.stub(ResourceBooking, 'findAndCountAll').callsFake(() => {
        return {
          count: 1,
          rows: [resourceBookingResponseBody]
        }
      })
      const entity = await service.searchResourceBookings({})
      expect(entity.result[0]).to.deep.eql(resourceBookingResponseBody.dataValues)
      expect(stub.calledOnce).to.be.true
      stub.restore()
    })
  })
})
