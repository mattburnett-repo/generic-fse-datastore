

const { request, persistedRequest, expect } = require('./testConfig')

describe('API Provider routes', () => {
    it('should get all providers', async () => {
        const response = await request.get("/api/v1/provider")
      
        expect(response.status).to.eql(200)

        const attributes = response.body
        expect(attributes).to.be.a('array')
        expect(attributes.length).to.be.greaterThan(0) 

        expect(attributes[0]).to.include.keys("id", "prefix_code", "description")
        expect(attributes[0].id).to.eql(1)
        expect(attributes[0].prefix_code).to.equal('ALL')
        expect(attributes[0].description).to.equal('Allianz')
    });
    it('should get a provider by id', async () => {
        const response = await request.get("/api/v1/provider/1")
      
        expect(response.status).to.eql(200)

        const attributes = response.body

        expect(attributes).to.include.keys("id", "prefix_code", "description")
        expect(attributes.id).to.eql(1)
        expect(attributes.prefix_code).to.equal('ALL')
        expect(attributes.description).to.equal('Allianz')
    })
})