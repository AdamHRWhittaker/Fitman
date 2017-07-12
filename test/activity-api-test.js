let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();
var assert = require('chai').assert;

chai.use(chaiHttp);

describe("activity-api", function () {
    
    describe('#api/activity', () => {
        it('should GET all the activities', (done) => {
            chai.request(server)
                .get('/api/activity')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.result.should.be.a('array');
                    done();
                });
        });
    })

    describe('#api/activity', () => {
        it('should POST a new activity', (done) => {

            let activity = { name: "test" };

            chai.request(server)
                .post('/api/activity')
                .send(activity)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert(res.body.records_affected, 1)
                    done();
                });
        });
    })

});


