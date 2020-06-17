const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000
const Workout = require('./models/index.js');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//var MONGODB_URI =  "mongodb://user1:password1@ds147821.mlab.com:47821/heroku_fdksxlkq";

mongoose.connect("mongodb://user1:password1@ds147821.mlab.com:47821/heroku_fdksxlkq", {
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
  Workout.find().then(dbWorkout=>{
      res.json(dbWorkout)
  })

    //res.json(workouts);
});

app.put("/api/workouts/:id", (req, res) =>{
    Workout.update({_id: req.params.id}, {$push: { exercises: req.body.exercise } })
});

app.post("/api/workouts", (req, res) =>{
console.log(req.body.workout);
    Workout.create(req.body.workout, function(err,result){
        if (err){
            res.send(err);
        } else{
            res.send(result);
            
        }
    }).then(dbWorkout=>{
        res.json(dbWorkout);
    });
});


app.listen(PORT, () =>{
console.log("listening on PORT" + PORT) ;
});

