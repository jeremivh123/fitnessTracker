const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var excerciseSchema = new Schema({
    type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
});

var workoutSchema = new Schema ({
    day: Date,
    excercises: [excerciseSchema]
});

var excercise = mongoose.model("excercise", excerciseSchema);

module.exports = excercise;