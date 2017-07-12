module.exports = function (app) {

    var url = "/api/user";
    var userData = require('../data/user-data');

    // GET: user (all)
    app.get(url, function (request, response) {
        userData.get(function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // GET: user (by id)
    app.get(url + '/:id', function (request, response) {
        var id = request.params.id;

        userData.getById(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // POST: user (insert)
    app.post(url, function (request, response) {
        var user = request.body;

        userData.insert(user, function (err, result, affected) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: result, records_affected: affected });
            }
        });
    });

    // PUT: user (update)
    app.put(url, function (request, response) {
        var user = request.body;

        userData.update(user, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // DELETE: user (hard delete)
    app.delete(url + '/:id', function (request, response){
        var id = request.params.id;

        userData.permDelete(id, function(err, results){
             if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // POST: user (soft delete)
    app.post(url + '/:id', function (request, response){
        var id = request.params.id;

        userData.delete(id, function(err, results){
             if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });
};