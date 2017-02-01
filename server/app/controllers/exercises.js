var Exercise = require('../models/exercise');
 
exports.getTodos = function(req, res, next){
 
    Exercise.find(function(err, exercises) {
 
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
        videolink: req.body.videolink

    }, function(err, exercise) {
 
        if (err){
            res.send(err);
        }
 
        Todo.find(function(err, exercise) {
 
            if (err){
                res.send(err);
            }
 
            res.json(exercises);
 
        });
 
    });
 
}
 
exports.deleteExercise = function(req, res, next){
 
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });
 
}