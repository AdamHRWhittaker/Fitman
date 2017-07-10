// self invoked anonymous function that exports all schema types
// mongoose schemas - http://mongoosejs.com/docs/guide.html

(function (schemas) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    schemas.comment = new Schema({
        id: String,
        message: String,
        author: String,
        created: Date,
        activityId: Number,
        deleted: Boolean
    });

    schemas.activity = new Schema({
        id: String,
        name: String,
        start: Date,
        end: Date,
        shared: Boolean,
        calories: Number,
        created: Date,
        deleted: Boolean,
        ownerId: String,
        ownerName: String
    });

    schemas.user = new Schema({
        id: String,
        username: String,
        password: String,
        role: String,
        created: String,
        deleted: Boolean,
        activities: []
    });

})(module.exports);