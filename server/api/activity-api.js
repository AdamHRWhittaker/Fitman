module.exports = function (app) {

    var url = "/api/activity";
    var activityData = require('../data/activity-data');

    // GET: activity (all)
    app.get(url, function (request, response) {
        activityData.get(function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // GET: activity (all shared)
    app.get(url + "/shared", function (request, response) {
        activityData.getShared(function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // GET: activities for (all shared, non deleted)
    app.get(url + "/user/:id", function (request, response) {
        var id = request.params.id;

        activityData.getForUser(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // GET: activity (by id) ---- USE FOR TEST
    app.get(url + '/:id', function (request, response) {
        var id = request.params.id;

        activityData.getById(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // POST: activity (insert)
    app.post(url, function (request, response) {
        var activity = request.body;

        console.log(activity);

        activityData.insert(activity, function (err, result, affected) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: result, records_affected: affected });
            }
        });
    });

    // PUT: activity (update)
    app.put(url, function (request, response) {
        var activity = request.body;

        activityData.update(activity, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // DELETE: activity (hard delete)
    app.delete(url + '/:id', function (request, response) {
        var id = request.params.id;

        activityData.permDelete(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // POST: activity (soft delete)
    app.post(url + '/:id', function (request, response) {
        var id = request.params.id;

        activityData.delete(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });
};