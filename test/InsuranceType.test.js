

const { request, persistedRequest, expect } = require('./testConfig')

describe('API Insurance Type routes', () => {
    it('should get all insurance types', async () => {
        const response = await request.get("/api/v1/insurance-type")
      
        expect(response.status).to.eql(200)

        const attributes = response.body
        expect(attributes).to.be.a('array')
        expect(attributes.length).to.be.greaterThan(0) 

        expect(attributes[0]).to.include.keys("id", "description")
        expect(attributes[0].id).to.eql(1)
        expect(attributes[0].description).to.equal('Liability')
    });
    it('should get a insurance type by id', async () => {
        const response = await request.get("/api/v1/insurance-type/1")
      
        expect(response.status).to.eql(200)

        const attributes = response.body

        expect(attributes).to.include.keys("id", "description")
        expect(attributes.id).to.eql(1)
        expect(attributes.description).to.equal('Liability')
    })
})