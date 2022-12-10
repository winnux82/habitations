//const Habitation = require('../models/Album')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');



const admin = catchAsync(async(req, res) => {
        res.render('admin', {
            title: 'Administration',
    });    
});


module.exports = {
    
    admin,

}