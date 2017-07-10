// self invoked anonymous function that exports all database instance
// mongoose database connection details - http://mongoosejs.com/docs/guide.html
// retrieves only one instance, creates if it doesnt exist

(function (database) {
    var mongoose = require('mongoose');
    let db = null;

    database.getDatabase = function (callback) {
        if (!db) {
            // connect to db
            mongoose.connect('mongodb://localhost/Fitman', function (err) {
                if (err) {
                    // connection failed, pass error and no db back
                    callback(err, null);                    
                    console.log('Error connecting to db');
                } else {
                    // connection successful, pass no error and db back                  
                    callback(null, mongoose);
                }
            });
        } else {
            // db already exists, pass no error and db back
            callback(null, db);
        }
    }
})(module.exports);