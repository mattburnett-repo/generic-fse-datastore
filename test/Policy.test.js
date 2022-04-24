

const { request, persistedRequest, expect } = require('./testConfig')

describe('API Policy routes', () => {
    // TODO: Figure out how to deal with: Uncaught Error: listen EADDRINUSE: address already in use :::4000
    //      You can run either tests or dev, but not both
    //          tests with --watch have "already in use error"
    //      spec.js: https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
    //      probably should use before() / after(() => { server.close() }), but this doesn't seem to work...

    let response, attributes;

    describe('GET', () => {
        it('should get all policies', async () => {
            response = await request.get("/api/v1/policy")
        
            expect(response.status).to.eql(200)

            attributes = response.body
            expect(attributes).to.be.a('array')
            expect(attributes.length).to.be.greaterThan(0) // there should be 1005 in fresh, unused test data

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
            response = await request.get("/api/v1/policy/1")
          
            expect(response.status).to.eql(200)
    
            attributes = response.body
    
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

    describe('PATCH', () => {
        it('should handle missing payload', async () => {
            response = await request.patch("/api/v1/policy/").send()

            expect(response.status).to.eql(400)
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.include("Error in policyRoutes.patch:")
        })

        it('should patch customer first name based on policy id', async () => {
            response = await request.patch("/api/v1/policy/")
                                            .send({id: 1, firstName: 'test firstName'})

            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.eql('policyRoutes.patch --- policyId: 1, firstName: test firstName')
        })
        it('should reset original first name value', async () => {
            // reset to original value
            response = await request.patch("/api/v1/policy/")
                                            .send({id: 1, firstName: 'firstName 01'})
            expect(response.status).to.eql(200)    
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.eql('policyRoutes.patch --- policyId: 1, firstName: firstName 01')        
        })

        it('should patch customer last name based on policy id', async () => {
            response = await request.patch("/api/v1/policy/")
                                            .send({id: 1, lastName: 'test lastName'})

            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.eql('policyRoutes.patch --- policyId: 1, lastName: test lastName')
        })
        it('should reset original last name value', async () => {
            // reset to original value
            response = await request.patch("/api/v1/policy/")
                                            .send({id: 1, lastName: 'lastName 01'})
            expect(response.status).to.eql(200)    
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.eql('policyRoutes.patch --- policyId: 1, lastName: lastName 01')      
        })

        it('should patch policy number based on policy id', async () => {
            response = await request.patch("/api/v1/policy/")
                                            .send({id: 1, policyNumber: 'test policyNumber'})

            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.eql('policyRoutes.patch --- policyId: 1, policyNumber: test policyNumber')
        })
        it('should reset original policy name value', async () => {
            response = await request.patch("/api/v1/policy/")
                                            .send({id: 1, policyNumber: 'ALLaaa111'})
            expect(response.status).to.eql(200)
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.eql('policyRoutes.patch --- policyId: 1, policyNumber: ALLaaa111')
        }) 
    })
})