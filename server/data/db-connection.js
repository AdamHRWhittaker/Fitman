// self invoked anonymous function that exports all database instance
// mongoose database connection details - http://mongoosejs.com/docs/guide.html
// retrieves only one instance, creates if it doesnt exist

(function (database) {
    var mongoose = require('mongoose');

            mongoose.connect('mongodb://localhost/Fitman', function (err) {
                if (err) {                   
                    console.log('Error connecting to db');
                    console.log(err);
                } else {
                }
            });
})(module.exports);