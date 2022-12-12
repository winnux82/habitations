const Agent = require('../models/agent')
const catchAsync = require('../helpers/catchAsync')
// const path = require('path');
// const fs = require('fs');
// const db = require('../config/database');
// const flash = require('connect-flash')

const agents = catchAsync(async (req, res) => {
    const agents = await Agent.findAll();
        //console.log(agents);
    res.render('agents', {
        title: 'Les agents',
        //Agents
        agents: agents
    });
});

const getAll = (req, res) => { 
    Agent.findAll()
        .then(agents => {
            res.status(200).json(agents);
        })
    .catch(error=>res.status(500).json(error))
    
};

const createAgent =async (req, res) => {
    try {
        //res.send(req.body);
        
        console.log(req.body);
        return;
        if (!req.body.matricule) {
            //req.flash('error', 'Le matricule ne doit pas être vide!');
            res.redirect('/agent/create');
            return;
        }
        await Agent.create({
            matricule: req.body.matricule,
            nom: req.body.lastname,  
            prenom: req.body.firstname,
            datedenaissance: req.body.date,
            adresse: req.body.adresse,
            cp: req.body.cp,
            tel: req.body.tel,
        });
        res.redirect('/agents');
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de la création de l\'agent');
        res.redirect('/agent/create');
   }
};

const createAgentForm = (req, res) => {
    res.render('new-agent', {
        title: 'Nouvel agent',
        //errors: req.flash('error'),
    });
};




module.exports = {
    agents,
    createAgent,
    createAgentForm,
    getAll,
}