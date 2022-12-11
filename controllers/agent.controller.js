const Agent = require('../models/agent')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');

const agents = catchAsync(async (req, res) => {
    res.render('agents', {
        title: 'Agents',

    });
});

const listeAgents = catchAsync(async (req, res) => {

    const listeAgents = await Agent.findAll();
    console.log(listeAgents.every(agent => agent instanceof Agent)); // true
    console.log("All agents:", JSON.stringify(users, null, 2));
    res.render('agents', {
        title: 'Agents',

    });
});


const createAgentForm = (req, res) => {
    res.render('new-agent', {
        title: 'Nouvel agent',
        //errors: req.flash('error'),
    });
};

// const getAll = (req, res) => { 
//     Agent.findAll()
//         .then(agents => {
//             res.status(200).json(agents);
//         })
//     .catch(error=>res.status(500).json(error))
    
// };
// const getOne = (req, res) => { };
// const createOne = (req, res) => {
//     Agent.create({
//         matricule: '114'
//     })
// };
// const updateOne = (req, res) => { };
// const deleteOne = (req, res) => { };


module.exports = {
    agents,
    createAgentForm,
    listeAgents,

}