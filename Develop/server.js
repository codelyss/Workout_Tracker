const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const seed = require('./seeders/seed');
const db = require('./database');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.get('/api/workouts', (req, res) => {
    db.getLastWorkout(function(lastWorkout) {
        res.send(lastWorkout);
    });
});

app.put('/api/workouts/:workoutId', (req, res) => {
    console.log(req.params);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
