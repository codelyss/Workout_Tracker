const db = require('./models.js');

const getLastWorkout = function(callBack) {
    db.find().limit(1).sort({$natural:-1}).then(result => {
        callBack(result);
    });
};

module.exports = {getLastWorkout}