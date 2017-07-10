// self invoked anonymous function that exports all data operations
// help from https://stackoverflow.com/questions/33028273/how-to-get-mongoose-to-list-all-documents-in-the-collection-to-tell-if-the-coll

(function (activityData) {
    var mongoose = require('mongoose');
    var db = require('./db-connection');
    var models = require('./models');
    var Activity = models.Activity;

    // get all records from db
    activityData.get = function (callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // get all records not deleted
                Activity.find({ 'deleted': false }, function (err, results) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // db query success pass no error and results back or validation if none exist
                        mongoose.disconnect();

                        if (results.length > 0) {
                            callback(null, results);
                        } else {
                            callback(null, "No records found");
                        }
                    }
                })
            }
        });
    };

    // get all records from db where shared
    activityData.getShared = function (callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // get all records not deleted
                Activity.find({ 'shared': true }, function (err, results) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // db query success pass no error and results back or validation if none exist
                        mongoose.disconnect();

                        if (results.length > 0) {
                            callback(null, results);
                        } else {
                            callback(null, "No records found");
                        }
                    }
                })
            }
        });
    };

    // get by id
    activityData.getById = function (id, callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // get all records not deleted
                Activity.find({ 'id': id }, function (err, results) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // db query success pass no error and results back or validation if none exist
                        mongoose.disconnect();

                        if (results.length > 0) {
                            callback(null, results);
                        } else {
                            callback(null, "No records found");
                        }
                    }
                })
            }
        });
    };

    // insert new activityData
    activityData.insert = function (data, callback) {
        // create new object for api data        
        var newActivity = new Activity({
            id: data.id,
            name: data.name,
            start: data.start,
            end: data.end,
            shared: data.shared,
            calories: data.calories,
            created: data.created,
            deleted: data.deleted,
            comments: data.comments
        });

        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                newActivity.save(function (err, activity, numAffected) {
                    if (err) {
                        // db insert error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // db query sucess pass no error and results back 
                        mongoose.disconnect();
                        callback(null, activity, numAffected);
                    }
                })
            }
        });
    };

    // update record
    activityData.update = function (data, callback) {
        let id = data.id;
        let updatedActivity = data;

        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // find record to update
                Activity.find({ 'id': id }, function (err, result) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // get first activity found
                        let activity = result[0];

                        if (result.length === 0) {
                            // db query failed no results
                            mongoose.disconnect();
                            callback(null, "No records found");
                        } else {
                            // update values
                            activity.id = updatedActivity.id;
                            activity.name = updatedActivity.name;
                            activity.start = updatedActivity.start;
                            activity.end = updatedActivity.end;
                            activity.shared = updatedActivity.shared;
                            activity.calories = updatedActivity.calories;
                            activity.created = updatedActivity.created;
                            activity.deleted = updatedActivity.deleted;
                            activity.comments = updatedActivity.comments;

                            activity.save(function (err, activity, numAffected) {
                                if (err) {
                                    // db update error occured, pass error and no results back
                                    callback(err, null);
                                } else {
                                    // db update success pass no error and results back 
                                    mongoose.disconnect();
                                    callback(null, activity);
                                }
                            });
                        }
                    }
                })
            }
        });
    };

    // hard delete activity
    activityData.permDelete = function (id, callback) {
        let activityId = id;

        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // find record to delete
                Activity.find({ 'id': activityId }).remove(function (err) {
                    if (err) {
                        // db delete error occured, pass error 
                        callback(err, null);
                    } else {
                        // db delete success pass no error and results back 
                        mongoose.disconnect();
                        callback(null, "Record deleted");
                    }
                })
            }
        });
    };

    // soft delete activity
    activityData.delete = function (id, callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // find record to update
                Activity.find({ 'id': id }, function (err, result) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // get first activity found
                        let activity = result[0];

                        if (result.length === 0) {
                            // db query failed no results
                            mongoose.disconnect();
                            callback(null, "No records found");
                        } else {
                            // update values
                            activity.deleted = true;

                            activity.save(function (err, activity, numAffected) {
                                if (err) {
                                    // db update error occured, pass error and no results back
                                    callback(err, null);
                                } else {
                                    // db update success pass no error and results back 
                                    mongoose.disconnect();
                                    callback(null, activity);
                                }
                            });
                        }
                    }
                })
            }
        });
    };
})(module.exports);