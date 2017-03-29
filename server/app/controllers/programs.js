var Program = require('../models/program');
var User = require('../models/user');

 
exports.getPrograms = function(req, res, next){
 
    Program.find(function(err, programs) {
 
        if (err){
            res.send(err);
        }
 
        res.json(programs);
 
    });
 
}
exports.getTrainerPrograms = function(req, res, next){
 
     var trainer_id = req.params.trainer_id;
        Program.find({createdby: trainer_id},function(err, programs) {
 
        if (err){
            res.send(err);
        }
        res.json(programs);
 
    });
 
}
exports.returnClientPrograms = function(req, res, next){
 
     var client_id = req.params.client_id;
        User.find({_id: client_id}, 'programs', function (err, programs) {
            
            console.log(programs)
            if( programs.length < 1){
                console.log("No Client Programs")
            }
        if (err){
            res.send(err);
        }
        res.json(programs);
 
    });
 
}
exports.removeClientProgram = function(req, res, next){
 
     var client_id = req.params.client_id;
     var program_id = req.params.program_id;
         User.update(
            client_id,
            {$pull: {programs: program_id}},
            function(err, User) {
                if(err){
                res.send(err);
                }
                res.json(User);
            });
 
}
 
exports.createProgram = function(req, res, next){
 
    Program.create({
        title : req.body.title,
        description: req.body.description,
        exercises: req.body.exercises,
        createdby: req.body.createdby

    }, function(err, program) {
 
        if (err){
            res.send(err);
        }
 
        Program.find(function(err, programs) {
 
            if (err){
                res.send(err);
            }
 
            res.json(programs);
 
        });
 
    });
 
}
exports.addClientProgram = function(req, res, next){
 
    
    var client_id = req.body.client_id;
    var new_program_id = req.body.program_id;
    
     User.update(
            client_id,
            {$push: {programs: new_program_id}},
            {safe: true, upsert: false},
            function(err, User) {
                if(err){
                res.send(err);
                }
                res.json(User);
            });
}
exports.deleteProgram = function(req, res, next){
 
    Program.remove({
        _id : req.params.program_id
    }, function(err, program) {
        res.json(program);
    });
 
}