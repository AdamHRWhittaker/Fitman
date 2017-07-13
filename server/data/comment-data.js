// self invoked anonymous function that exports all data operations
// help from https://stackoverflow.com/questions/33028273/how-to-get-mongoose-to-list-all-documents-in-the-collection-to-tell-if-the-coll

(function (commentData) {
   
    var models = require('./models');
    var Comment = models.Comment;

    // get all records from db
    commentData.get = function (callback) {

        // get all records not deleted
        Comment.find({ 'deleted': false }, function (err, results) {
            if (err) {
                // db query error occured, pass error and no results back
                callback(err, null);
            } else {
                // db query success pass no error and results back or validation if none exist
              

                if (results.length > 0) {
                    callback(null, results);
                } else {
                    callback(null, "No records found");
                }
            }
        })

    };

    // get by id
    commentData.getById = function (id, callback) {

        // get all records not deleted
        Comment.find({ 'id': id }, function (err, results) {
            if (err) {
                // db query error occured, pass error and no results back
                callback(err, null);
            } else {
                // db query success pass no error and results back or validation if none exist
             

                if (results.length > 0) {
                    callback(null, results);
                } else {
                    callback(null, "No records found");
                }
            }
        })

    };

    // get by activity id
    commentData.getByActivityId = function (id, callback) {

        // get all records not deleted
        Comment.find({ 'activityId': id }, function (err, results) {
            if (err) {
                // db query error occured, pass error and no results back
                callback(err, null);
            } else {
                // db query success pass no error and results back or validation if none exist
              

                if (results.length > 0) {
                    callback(null, results);
                } else {
                    callback(null, "No records found");
                }
            }
        })

    };

    // insert new commentData
    commentData.insert = function (data, callback) {
        // create new object for api data        
        var newComment = new Comment({
            id: data.id,
            message: data.message,
            author: data.author,
            created: data.created,
            deleted: data.deleted,
            activityId: data.activityId
        });

        console.log(data);


        newComment.save(function (err, comment, numAffected) {
            if (err) {
                // db insert error occured, pass error and no results back
                callback(err, null);
            } else {
                // db query sucess pass no error and results back 
              
                callback(null, comment, numAffected);
            }
        })

    };

    // update record
    commentData.update = function (data, callback) {
        let id = data.id;
        let updatedComment = data;


        // find record to update
        Comment.find({ 'id': id }, function (err, result) {
            if (err) {
                // db query error occured, pass error and no results back
                callback(err, null);
            } else {
                // get first comment found
                let comment = result[0];

                if (result.length === 0) {
                    // db query failed no results
                 
                    callback(null, "No records found");
                } else {
                    // update values
                    comment.id = updatedComment.id;
                    comment.message = updatedComment.message;
                    comment.author = updatedComment.author;
                    comment.created = updatedComment.created;
                    comment.deleted = updatedComment.deleted;

                    comment.save(function (err, comment, numAffected) {
                        if (err) {
                            // db update error occured, pass error and no results back
                            callback(err, null);
                        } else {
                            // db update success pass no error and results back 
                          
                            callback(null, comment);
                        }
                    });
                }
            }
        })

    };

    // hard delete comment
    commentData.permDelete = function (id, callback) {
        let commentId = id;


        // find record to delete
        Comment.find({ 'id': commentId }).remove(function (err) {
            if (err) {
                // db delete error occured, pass error 
                callback(err, null);
            } else {
                // db delete success pass no error and results back 
             
                callback(null, "Record deleted");
            }
        })

    };

    // soft delete comment
    commentData.delete = function (id, callback) {

        // find record to update
        Comment.find({ 'id': id }, function (err, result) {
            if (err) {
                // db query error occured, pass error and no results back
                callback(err, null);
            } else {
                // get first comment found
                let comment = result[0];

                if (result.length === 0) {
                    // db query failed no results
               
                    callback(null, "No records found");
                } else {
                    // update values
                    comment.deleted = true;

                    comment.save(function (err, comment, numAffected) {
                        if (err) {
                            // db update error occured, pass error and no results back
                            callback(err, null);
                        } else {
                            // db update success pass no error and results back 
                        
                            callback(null, comment);
                        }
                    });
                }
            }
        })

    };
})(module.exports);