const models = require('../model/dramaModels');

const dramaController = {};

//gets every list so far of dramas 
dramaController.getAllEntries = (req,res, next) => {
    console.log("I'm in getAllEntries");
    models.Drama.find({}, (err, entries)=> {
        if (err) {
            return next({
                log: 'Express error handler caught middleware error',
                status: 400,
                message: { err: 'An error occurred.' },
            })
        }
        //this should be an array of objs
        res.locals.allEntries = entries;
        return next();
    })
}

dramaController.createEntry = (req, res, next) => {
    const {name, overall_rating, thoughts} = req.body;
    console.log("this is createEntry")
    models.Drama.create({name, overall_rating, thoughts}, (err, entry)=>{
        if (err) {
            return next({
                log: 'Express error handler caught error in createEntry',
                status: 400,
                message: { err: 'An error occurred.' },
            })
        }
        res.locals.entry = entry;
        return next();
    })
}

dramaController.deleteEntry = (req, res, next) => {
    const {_id} = req.body;
    models.Drama.deleteOne({_id})
        .then(data => {
            res.locals.deleted = data;
            return next();
        })
        .catch((err) => {
            return next({
                log: 'Express error handler caught error in deleteEntry',
                status: 400,
                message: { err: 'An error occurred.' },
            })
        })
}

dramaController.deleteEntry = (req, res, next) => {
    const {_id} = req.body;
    models.Drama.deleteOne({_id})
        .then(data => {
            res.locals.deleted = data;
            return next();
        })
        .catch((err) => {
            return next({
                log: 'Express error handler caught error in deleteEntry',
                status: 400,
                message: { err: 'An error occurred.' },
            })
        })
}

dramaController.updateEntry = (req, res, next) => {
    const {_id, name, overall_rating, thoughts} = req.body;
    models.Drama.findOneAndUpdate({_id}, {name, overall_rating, thoughts})
        .then(data => {
            res.locals.updated = data;
            return next();
        })
        .catch((err) => {
            return next({
                log: 'Express error handler caught error in updateEntry',
                status: 400,
                message: { err: 'An error occurred.' },
            })
        })
}
module.exports = dramaController;