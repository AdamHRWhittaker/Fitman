module.exports = function (app) {

    var url = "/api/comment";
    var commentData = require('../data/comment-data');

    // GET: comment (all)
    app.get(url, function (request, response) {
        commentData.get(function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // GET: comment (by id)
    app.get(url + '/:id', function (request, response) {
        var id = request.params.id;

        commentData.getById(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // GET: comment (by activity id)
    app.get(url + '/activity/:id', function (request, response) {
        var id = request.params.id;

        commentData.getByActivityId(id, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // POST: comment (insert)
    app.post(url, function (request, response) {
        var comment = request.body;

        console.log(request);

        commentData.insert(comment, function (err, result, affected) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: result, records_affected: affected });
            }
        });
    });

    // PUT: comment (update)
    app.put(url, function (request, response) {
        var comment = request.body;

        commentData.update(comment, function (err, results) {
            if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // DELETE: comment (hard delete)
    app.delete(url + '/:id', function (request, response){
        var id = request.params.id;

        commentData.permDelete(id, function(err, results){
             if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });

    // POST: comment (soft delete)
    app.post(url + '/:id', function (request, response){
        var id = request.params.id;

        commentData.delete(id, function(err, results){
             if (err) {
                response.json({ status: "Error", error: err });
            } else {
                response.json({ result: results });
            }
        });
    });
};