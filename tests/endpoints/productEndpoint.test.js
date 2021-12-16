const Product = require('../../models/Product');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();
chai.use(chaiHttp);

describe('/product', function test() {
  beforeEach((done) => { //Before each test we empty the database
    Product.remove({}, (err) => {
      done();
    });
  });

  describe('post', function test() {
    it('should respond with 201 created', function test(done) {
      const expectedResponse = {
        "brand": "shikes",
        "parentId": null,
        "properties": {
          "name": "cool shirt",
          "price": "free"
        },
        "__v": 0
      };
      chai.request(server).post('/product')
        .set('Content-Type', 'application/json')
        .send({
          "brand": "shikes",
          "properties": {
            "name": "cool shirt",
            "price": "free"
          }
        })
        .end(function res(err, res) {
          if (err) {return done(err);}
          delete res.body._id;
          res.body.should.deep.equal(expectedResponse);
          done();
        });
    });

  });
});
