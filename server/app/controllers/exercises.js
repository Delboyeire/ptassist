var Exercise = require('../models/exercise');
 
exports.getExercises = function(req, res, next){
 
    Exercise.find(function(err, exercises) {
 
        if (err){
            res.send(err);
        }
        res.json(exercises);
 
    });
 
}
exports.getExercisesForProgram = function(req, res, next){

    exercise_ids = req.body.exercise_ids;
 
    Exercise.find({ "_id": { "$in": [exercise_ids ] } },function(err, exercises) {
 
        if (err){
            res.send(err);
        }
        res.json(exercises);
 
    });
 
}
 
exports.createExercise = function(req, res, next){
 
    Exercise.create({
        name : req.body.name,
        description: req.body.description,
        video: req.body.video,
        image: req.body.image
        
    }, function(err, exercise) {
        
        if (err){
            res.send(err);
        }
 
        Exercise.find(function(err, exercises) {
 
            if (err){
                res.send(err);
            }
    
            res.json(exercises);
 
        });
 
    });
 
}
 
exports.deleteExercise = function(req, res, next){
 
    Exercise.remove({
        _id : req.params.exercise_id
    }, function(err, exercise) {
        if (err){
                res.send(err);
        }

        res.json(exercise);
    });
 
}