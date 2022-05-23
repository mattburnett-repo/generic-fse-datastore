
const { request, expect } = require('./testConfig')

describe('API Customer routes', () => {
    describe('GET', () => {
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
    describe("PATCH", () => {
        it('should handle missing payload', async () => {
            response = await request.patch("/api/v1/customer/").send()

            expect(response.status).to.eql(400)
            expect(response.body).to.include.keys("message")
            expect(response.body.message).to.include("Error in customerRoutes.patch:")
        })   
        it('should patch customer first name based on customer id', async () => {
            response = await request.patch("/api/v1/customer/")
                                            .send({id: 1, firstName: 'test firstName'}) 

            expect(response.status).to.eql(200)

            const result = response.body
            expect(result).to.include.keys('id', 'first_name', 'last_name', 'date_of_birth')
            expect(result.id).to.eql(1)
            expect(result.first_name).to.eql('test firstName')
            expect(result.last_name).to.eql('lastName 01')
            expect(result.date_of_birth).to.eql('1969-12-31T23:00:00.000Z')
        })
        it('should reset original first name value', async () => {
            response = await request.patch("/api/v1/customer/")
                                            .send({id: 1, firstName: 'firstName 01'})
            expect(response.status).to.eql(200)    
            
            const result = response.body
            expect(result).to.include.keys('id', 'first_name', 'last_name', 'date_of_birth')
            expect(result.id).to.eql(1)
            expect(result.first_name).to.eql('firstName 01')
            expect(result.last_name).to.eql('lastName 01')
            expect(result.date_of_birth).to.eql('1969-12-31T23:00:00.000Z')     
        })
        it('should patch customer last name based on customer id', async () => {
            response = await request.patch("/api/v1/customer/")
                                            .send({id: 1, lastName: 'test lastName'})

            expect(response.status).to.eql(200)
            
            const result = response.body
            expect(result).to.include.keys('id', 'first_name', 'last_name', 'date_of_birth')
            expect(result.id).to.eql(1)
            expect(result.first_name).to.eql('firstName 01')
            expect(result.last_name).to.eql('test lastName')
            expect(result.date_of_birth).to.eql('1969-12-31T23:00:00.000Z')  
        })
        it('should reset original last name value', async () => {
            response = await request.patch("/api/v1/customer/")
                                            .send({id: 1, lastName: 'lastName 01'})
            expect(response.status).to.eql(200)    
            
            const result = response.body
            expect(result).to.include.keys('id', 'first_name', 'last_name', 'date_of_birth')
            expect(result.id).to.eql(1)
            expect(result.first_name).to.eql('firstName 01')
            expect(result.last_name).to.eql('lastName 01')
            expect(result.date_of_birth).to.eql('1969-12-31T23:00:00.000Z')    
        })   
    })
})