

let mongoose = require("mongoose");
let Quote = require('../quoteModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let app = 'https://udldlrfizk.execute-api.us-east-1.amazonaws.com/dev/api/quotes';

chai.use(chaiHttp);

describe('quotes', () => {
    beforeEach((done) => {
        Quote.remove({}, (err) => {
           done();
        });
    });
  describe('/GET quote', () => {
      it('it should GET all the quotes', (done) => {
            chai.request(app)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
                  //res.body.should.have.property('message').eql("Quotes retrieved successfully");
              done();
            });
      });
  });
  describe('/POST quote', () => {
      it('it should not POST a quote without content field', (done) => {
          let quote = {
             
          }
            chai.request(app)
            .post('/')
            .send(quote)
            .end((err, res) => {
                  res.should.have.status(403);
                  //res.body.should.have.property('message').eql("error: Unable to save quote");
              done();
            });
      });
      it('it should POST a quote ', (done) => {
          let quote = {
              content: 1
          }
            chai.request(app)
            .post('/')
            .send(quote)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  //res.body.should.have.property('message').eql('New quote saved!');
                  res.body.data.should.have.property('content');
              done();
            });
      });
  });
  describe('/GET/:id quote', () => {
      it('it should GET a quote by the given id', (done) => {
          let quote = new Quote({ content: 1170 });
          quote.save((err, quote) => {
              chai.request(app)
            .get('/' + quote.id)
            .send(quote)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.should.have.property('content'); 
              done();
            });
          });

      });
  });
  describe('/PUT/:id quote', () => {
      it('it should UPDATE a quote given the id', (done) => {
          let quote = new Quote({content: 778})
          quote.save((err, quote) => {
                chai.request(app)
                .put('/' + quote.id)
                .send({content: 800})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      //res.body.should.have.property('message').eql('Quote updated!');
                      res.body.data.should.have.property('content').eql('800');
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id quote', () => {
      it('it should DELETE a quote given the id', (done) => {
          let quote = new Quote({content: 778})
          quote.save((err, quote) => {
                chai.request(app)
                .delete('/' + quote.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      //res.body.should.have.property('message').eql('Quote deleted!');
                  done();
                });
          });
      });
  });
});