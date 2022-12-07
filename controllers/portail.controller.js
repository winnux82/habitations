//const Habitation = require('../models/Album')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');


const habitations = catchAsync(async(req, res) => {
    res.render('habitations', {
        title: 'Liste des habitations',
    });
});
const admin = catchAsync(async(req, res) => {
        res.render('admin', {
            title: 'Administration',
    });    
});

const agents = catchAsync(async(req, res) => {
    res.render('agents', {
        title: 'Agents',
});    
});
module.exports = {
    habitations,
    admin,
    agents,
}