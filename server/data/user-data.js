// self invoked anonymous function that exports all data operations
// help from https://stackoverflow.com/questions/33028273/how-to-get-mongoose-to-list-all-documents-in-the-collection-to-tell-if-the-coll

(function (userData) {
    var mongoose = require('mongoose');
    var db = require('./db-connection');
    var models = require('./models');
    var User = models.User;

    // get all records from db
    userData.get = function (callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // get all records not deleted
                User.find({ 'deleted': false }, function (err, results) {
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
    userData.getById = function (id, callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // get all records not deleted
                User.find({ 'id': id }, function (err, results) {
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

    // insert new userData
    userData.insert = function (data, callback) {
        // create new object for api data        
        var newUser = new User({
            id: data.id,
            username: data.username,
            password: data.password,
            role: data.role,
            created: data.created,
            deleted: data.deleted,
            activities: data.activities
        });

        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                newUser.save(function (err, user, numAffected) {
                    if (err) {
                        // db insert error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // db query sucess pass no error and results back 
                        mongoose.disconnect();
                        callback(null, user, numAffected);
                    }
                })
            }
        });
    };

    // update record
    userData.update = function (data, callback) {
        let id = data.id;
        let updatedUser = data;

        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // find record to update
                User.find({ 'id': id }, function (err, result) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // get first user found
                        let user = result[0];

                        if (result.length === 0) {
                            // db query failed no results
                            mongoose.disconnect();
                            callback(null, "No records found");
                        } else {
                            // update values
                            user.id = updatedUser.id;
                            user.username = updatedUser.username;
                            user.password = updatedUser.password;
                            user.role = updatedUser.role;
                            user.created = updatedUser.created;
                            user.deleted = updatedUser.deleted;
                            user.activities = updatedUser.activities;

                            user.save(function (err, user, numAffected) {
                                if (err) {
                                    // db update error occured, pass error and no results back
                                    callback(err, null);
                                } else {
                                    // db update success pass no error and results back 
                                    mongoose.disconnect();
                                    callback(null, user);
                                }
                            });
                        }
                    }
                })
            }
        });
    };

    // hard delete user
    userData.permDelete = function (id, callback) {
        let userId = id;

        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // find record to delete
                User.find({ 'id': userId }).remove(function (err) {
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

    // soft delete user
    userData.delete = function (id, callback) {
        db.getDatabase(function (err, db) {
            if (err) {
                // db connection error ocurred
                callback(err, null);
            } else {
                // find record to update
                User.find({ 'id': id }, function (err, result) {
                    if (err) {
                        // db query error occured, pass error and no results back
                        callback(err, null);
                    } else {
                        // get first user found
                        let user = result[0];

                        if (result.length === 0) {
                            // db query failed no results
                            mongoose.disconnect();
                            callback(null, "No records found");
                        } else {
                            // update values
                            user.deleted = true;

                            user.save(function (err, user, numAffected) {
                                if (err) {
                                    // db update error occured, pass error and no results back
                                    callback(err, null);
                                } else {
                                    // db update success pass no error and results back 
                                    mongoose.disconnect();
                                    callback(null, user);
                                }
                            });
                        }
                    }
                })
            }
        });
    };
})(module.exports);