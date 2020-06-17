const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const allWorkouts = require('./models/index.js');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var MONGODB_URI =  "mongodb://user1:password1@ds147821.mlab.com:47821/heroku_fdksxlkq";

 var db = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
  });

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
});
app.get("/exercise", (req,res)=>{
    res.sendFile(__dirname + "/public/exercise.html")
});
app.get("/stats", (req,res)=>{
    res.sendFile(__dirname + "/public/stats.html")
});

app.get("/api/workouts", (req, res)=>{
    var workouts = allWorkouts.Workout.find()
    res.json(workouts);
});

app.put("/api/workouts/:id", (req, res) =>{
    allWorkouts.Workout.update({_id: req.params.id}, {$push: { exercises: req.body.exercise } })
});

app.post("/api/workouts", (req, res) =>{
console.log(req.body.workout);
    allWorkouts.Workout.create(req.body.workout, function(err,result){
        if (err){
            res.send(err);
        } else{
            res.send(result);
            
        }
    });
});




app.listen(port, () =>
console.log("listening on PORT" + port) );
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("db connected!")
});

