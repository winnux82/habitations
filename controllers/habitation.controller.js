//const Habitation = require('../models/habitation')
const catchAsync = require('../helpers/catchAsync')
const { success } = require('../helpers/helper');
const path = require('path');
const fs = require('fs');


const habitations = catchAsync(async(req, res) => {
    res.render('habitations', {
        title: 'Liste des habitations',
    });
    const message = "Voici la liste des habitations"
    //res.json(success(message,habitations))
});

const createHabitationForm = catchAsync(async(req, res) => {
    res.render('new-habitation', {
        title: 'Nouvelle habitation',
        //errors: req.flash('error'),
    });
});


module.exports = {
    habitations,
    createHabitationForm,
}