//const Habitation = require('../models/Album')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');



const admin = catchAsync(async(req, res) => {
        res.render('admin', {
            title: 'Administration',
    });    
});


const err404 = catchAsync(async(req, res) => {
    res.render('404', {
        title: 'Erreur 404',
});    
});


module.exports = {
    
    admin,
    err404,

}