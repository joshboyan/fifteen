var request = require('supertest');
var expect = require('chai').expect;
var rewire = require('rewire');
var app = rewire('../server/app');

describe('Fifteen app', function() {

    // Slow conections 
    this.timeout(10000);
  
  it('Loads the UI', function(done){
    request(app).get('/').expect(200).end(done);
  });

  it('GETs /api/scores', function(done){
    request(app).get('/api/scores').expect(200).end(done);
  });

  it('POSTs /api/scores', function(done){
    request(app)
      .post('/api/scores')
      .send({timer: 111, moves: 111, name:'AAA', key: 1})
      .expect(200).end(done);
  });

});