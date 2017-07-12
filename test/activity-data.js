var assert = require('chai').assert;
var actvityData = require("../server/data/activity-data");

describe("activity-data", function () {
    describe("#getById", function () {
        it("should return an activity when a valid activity id is supplied", function (done) {
            let activityId = '69';

            actvityData.getById(activityId, function (err, activity) {
                if (err) {
                    done(err);
                } else {
                    assert.isNotNull(activity);
                    done();
                }
            });
        });
    });

});