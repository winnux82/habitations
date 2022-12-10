const Agent = require('../models/agent')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');

const agents = catchAsync(async(req, res) => {
    res.render('agents', {
        title: 'Agents',
});    
});

const createAgentForm = (req, res) => {
    res.render('new-agent', {
        title: 'Nouvel agent',
        errors: req.flash('error'),
    });
};


module.exports = {
    agents,
    createAgentForm,
}