
const { request, persistedRequest, expect } = require('./testConfig')

describe('API Customer routes', () => {
    it('should get all customers', async () => {
        const response = await request.get("/api/v1/customer")
      
        expect(response.status).to.eql(200)

        const attributes = response.body
        expect(attributes).to.be.a('array')
        expect(attributes.length).to.be.greaterThan(0) 

        expect(attributes[0]).to.include.keys("id", "first_name", "last_name", "date_of_birth")
        expect(attributes[0].id).to.eql(1)
        expect(attributes[0].first_name).to.equal('firstName 01')
        expect(attributes[0].last_name).to.equal("lastName 01")
        expect(attributes[0].date_of_birth).to.equal("1969-12-31T23:00:00.000Z")
    });
    it('should get a customer by id', async () => {
        const response = await request.get("/api/v1/customer/1")
      
        expect(response.status).to.eql(200)

        const attributes = response.body

        expect(attributes).to.include.keys("id", "first_name", "last_name", "date_of_birth")
        expect(attributes.id).to.eql(1)
        expect(attributes.first_name).to.equal('firstName 01')
        expect(attributes.last_name).to.equal("lastName 01")
        expect(attributes.date_of_birth).to.equal("1969-12-31T23:00:00.000Z")
    })
})