const chai=require("chai");
const chaihttp=require("chai-http");
const server=require('../server');

//assertion style
chai.should();
chai.use(chaihttp)
let email='testtutorbin1@gmail.com'
let token;
let author;

describe('USER MODULE API TESTING',()=>{
    /**
     * TEST Create User Route
     */
    describe('POST /api/user/create',()=>{
          it('It should create new user',(done)=>{
              const body={
                  "email":email,
                  "name":"testboy",
                  "password":"passtest"
              }
                  chai.request(server)
                  .post('/api/user/create')
                  .send(body)
                  .end((err,response)=>{
                      response.body.should.be.a('object')
                      
                      response.body.should.have.property('message').equal('Request is Successful')
                      response.body.should.have.property('success').equal(true);
                      response.body.should.have.property('statusCode').equal(200);

                      done()
                  })
          })


          it('It should fail, if email is already registered',(done)=>{
            const body={
                "email":email,
                "name":"testboy",
                "password":"passtest"
            }
                chai.request(server)
                .post('/api/user/create')
                .send(body)
                .end((err,response)=>{
                    response.body.should.be.a('object')
                    response.body.should.have.property('message').equal('Email registered already')
                    response.body.should.have.property('success').equal(false);
                    response.body.should.have.property('statusCode').equal(400);

                    done()
                })
        })
    })

})




describe('AUTH MODULE API TESTING',()=>{
    /**
     * TEST Login Route
     */
    describe('POST /api/auth/login',()=>{
          it('It should login successfully',(done)=>{
              const body={
                  "email":email,
                  "password":"passtest"
              }
                  chai.request(server)
                  .post('/api/auth/login')
                  .send(body)
                  .end((err,response)=>{
                    token=response.body.token;
                      response.body.should.be.a('object')
                      response.body.should.have.property('token')
                      done()
                  })
          })


          it('It should fail, if password is wrong',(done)=>{
            const body={
                "email":email,
                "password":"passtest123"
            }
                chai.request(server)
                .post('/api/auth/login')
                .send(body)
                .end((err,response)=>{
                    response.body.should.be.a('object')
                    response.body.should.have.property('message').equal('Wrong email or Password')
                    response.body.should.have.property('success').equal(false);
                    done()
                })
        })
    })

})





describe('TASK MODULE API TESTING',()=>{
    /**
     * TEST add task Route
     */
    describe('POST /api/task/add',()=>{
          it('It should create new task for user',(done)=>{
              const body={
                  "content":"Meeting with boss today.",
              }
                  chai.request(server)
                  .post('/api/task/add')
                  .set({
                      'Authorization':`Bearer ${token}`
                  })
                  .send(body)
                  .end((err,response)=>{
                      author=response.body.data.author
                      response.body.should.be.a('object')
                      response.body.should.have.property('message').eq('Request is Successful');
                      response.body.should.have.property('success').eq(true)
                      response.body.should.have.property('data')
                      .which.is.an('object')
                     .and.has.property('_id')
                      response.body.should.have.property('data').which.is.an('object')
                      .and.has.property('author')
                      done()
                  })
          })

          
    })


    describe('GET /api/task/:userid/list',()=>{
        it('It should return task of user',(done)=>{
                chai.request(server)
                .get(`/api/task/${author}/list`)
                .set({
                    'Authorization':`Bearer ${token}`
                })
                .end((err,response)=>{
                    response.body.should.be.a('object')
                    response.body.should.have.property('message').eq('Request is Successful');
                    response.body.should.have.property('success').eq(true)
                    response.body.should.have.property('data').which.is.an('array')
                    done()
                })
        })
})

})
