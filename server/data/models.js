// self invoked anonymous function that exports all model types
// mongoose models - http://mongoosejs.com/docs/guide.html

(function (models) {
    var mongoose = require('mongoose');
    var schemas = require('./schemas');

    models.Comment = mongoose.model('Comment', schemas.comment);
    models.Activity = mongoose.model('Activity', schemas.activity);
    models.User = mongoose.model('User', schemas.user);

})(module.exports);