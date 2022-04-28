
const { request, expect } = require('./testConfig')

// const app = require ('../server.js')
// const app = require('../testServer.js') 
// const request = require('supertest')(app)  
// const expect = require("chai").expect;

// https://stackoverflow.com/questions/35563942/testing-nodejs-with-mocha-and-supertest-how-to-get-the-app#35573213

// 20220426: port conflict problem won't go away
//              in .testConfig, if you require ../index.js into const app, tests run, but there is a "port in use ::: 4000" error
//                  same as if the dev server is running at the same time (on port 4000)
//              tried moving server code out of ../index.js into ../server.js
//                  this lets us use ../index.js or ./testServer.js, which allow different ports
//              tried running ./testServer with unspecified / ephermal and 4100 as port/s
//              tried setting up before / after blocks, changing app and supertest request objects to start app in 'before'
//              HOWEVER
//              all solutions end up with 'test one  relation "policy" does not exist' on first test
//                  assume that all other tests will have same problem
//                  this is a weird database problem. the tests can access the API route/s, but the database queryString / call
//                      gets munged
//
//              spent two days on this. learned a lot of new info, but found no solution.
//              so for now we are stuck with ../index.js, which means either/or dev/test, along with the "port in use error"
//                  not happy with this.

describe('API Policy routes', () => {
    let server, response, attributes;    

    // before(async () => {     
    //         delete require.cache[require.resolve('../server.js')];
    //         console.log('before tests')
    //         server = await app.listen(() => {
    //         console.log('server started')   
    //     })
    // })  
    // after(async () => {
    //     await server?.close()
    //     console.log('after tests')
    // })

    describe('GET', () => {
        it('should get all policies', async () => {
            // response = await request.get("/api/v1/policy").expect(200, done())
            response = await request.get("/api/v1/policy")
            // response = await request(server).get("/api/v1/policy")

            console.log('test one ', response.body.message)   
        
            expect(response.status).to.eql(200)

            attributes = response.body
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