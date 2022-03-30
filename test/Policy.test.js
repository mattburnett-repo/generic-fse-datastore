

const { request, persistedRequest, expect } = require('./testConfig')

describe('API Policy routes', () => {
    it('should get all policies', async () => {
        const response = await request.get("/api/v1/policy")
      
        expect(response.status).to.eql(200)

        const attributes = response.body
        expect(attributes).to.be.a('array')
        expect(attributes.length).to.be.greaterThan(0) 

        expect(attributes[0]).to.include.keys("id", "customer_id", "provider_id", "insurance_type_id", "status_id", "policy_number", "start_date", "end_date", "created_at")
        expect(attributes[0].id).to.eql(1)
        expect(attributes[0].customer_id).to.eql(1)
        expect(attributes[0].provider_id).to.eql(1)
        expect(attributes[0].insurance_type_id).to.eql(1)
        expect(attributes[0].status_id).to.eql(1)
        expect(attributes[0].policy_number).to.eql('ALLaaa111')
        expect(attributes[0].start_date).to.equal("1999-12-31T23:00:00.000Z")
        expect(attributes[0].end_date).to.eql("2000-12-31T23:00:00.000Z")
        expect(attributes[0].created_at).to.not.be.null
    });
    it('should get a policy by id', async () => {
        const response = await request.get("/api/v1/policy/1")
      
        expect(response.status).to.eql(200)

        const attributes = response.body

        expect(attributes).to.include.keys("id", "customer_id", "provider_id", "insurance_type_id", "status_id", "policy_number", "start_date", "end_date", "created_at")
        expect(attributes.id).to.eql(1)
        expect(attributes.customer_id).to.eql(1)
        expect(attributes.provider_id).to.eql(1)
        expect(attributes.insurance_type_id).to.eql(1)
        expect(attributes.status_id).to.eql(1)
        expect(attributes.policy_number).to.eql('ALLaaa111')
        expect(attributes.start_date).to.equal("1999-12-31T23:00:00.000Z")
        expect(attributes.end_date).to.eql("2000-12-31T23:00:00.000Z")
        expect(attributes.created_at).to.not.be.null
    })
})