const db = require('./models.js');

const getLastWorkout = function(callBack) {
    db.find().limit(1).sort({$natural:-1}).then(result => {
        callBack(result);
    });
};

const getAllWorkouts = function(callBack) {
    db.find().then(result => {
        callBack(result);
    });
}

const insertExercise = function(exercise, callBack) {
    db.insertMany(exercise).then(result => {
        callBack(result);
    });
}

const updateWorkout = function(id, exercise, callBack) {
    db.findByIdAndUpdate(id, exercise).then(result => {
        callBack(result);
    });
}

module.exports = {getLastWorkout, getAllWorkouts, insertExercise, updateWorkout}