const Agent = require('../models/agent')
const catchAsync = require('../helpers/catchAsync')
const path = require('path');
const fs = require('fs');
const db = require('../config/database');


const agents = catchAsync(async (req, res) => {
    res.render('agents', {
        title: 'Agents',

    });
});
//=>/agents/list
const listeAgents = catchAsync(async (req, res) => {

    const listeAgents = await Agent.findAll();
    console.log(listeAgents.every(agent => agent instanceof Agent)); // true
    console.log("All agents:", JSON.stringify(agents));
    res.render('agents', {
        title: 'Agents',

    });
});


const listeAgents2 = catchAsync(async (req, res) => 
    Agent.findAll()
        .then(agents => res.render('agents',
            {
        title: 'Agents',
        agents
      }))
    .catch(err => res.render('error', {error: err})));
;


const createAgentForm = (req, res) => {
    res.render('new-agent', {
        title: 'Nouvel agent',
        //errors: req.flash('error'),
    });
};

const getAll = (req, res) => { 
    Agent.findAll()
        .then(agents => {
            res.status(200).json(agents);
        })
    .catch(error=>res.status(500).json(error))
    
};
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
    getAll,
    listeAgents,
    listeAgents2,

}