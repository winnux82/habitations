//const Habitation = require('../models/habitation')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');

const habitations = catchAsync(async(req, res) => {
    res.render('habitations', {
        title: 'Liste des habitations',
    });
});

const createHabitation = (req, res) => {
    res.render('new-agent', {
        title: 'Nouvelle habitation',
        errors: req.flash('error'),
    });
};


module.exports = {
    habitations,
    createHabitation,
}