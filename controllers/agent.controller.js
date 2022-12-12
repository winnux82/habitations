const Agent = require('../models/agent');
const catchAsync = require('../helpers/catchAsync');
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
        agents: agents,
    });
});

const getAll = (req, res) => {
    Agent.findAll()
        .then((agents) => {
            res.status(200).json(agents);
        })
        .catch((error) => res.status(500).json(error));
};

const createAgent = async (req, res) => {
    try {
        //res.send(req.body);
        //console.log(req.body.matricule);

        if (!req.body.matricule) {
            //req.flash('error', 'Le matricule ne doit pas être vide!');
            res.redirect('/agent/create');
            return;
        }
        const { matricule, lastname, firstname, birthday, adresse, cp, tel } =
            req.body;
        await Agent.create({
            matricule,
            lastname,
            firstname,
            birthday,
            adresse,
            cp,
            tel,
            // matricule: req.body.matricule,
            // lastname: req.body.lastname,
            // firstname: req.body.firstname,
            // birthday: req.body.date,
            // adresse: req.body.adresse,
            // cp: req.body.cp,
            // tel: req.body.tel,
        });
        res.redirect('/agents');
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de la création de l\'agent');
        res.redirect('/agent/create');
    }
};

const updateAgent = async (req, res) => {
    const idAgent = req.params.id;
    try {
        //res.send(req.body);
        //console.log(req.body.matricule);

        if (!req.body.matricule) {
            //req.flash('error', 'Le matricule ne doit pas être vide!');
            res.redirect('/agent/create');
            return;
        }

        console.log(req.body.matricule);
        const {
            id,
            matricule,
            lastname,
            firstname,
            birthday,
            adresse,
            cp,
            tel,
        } = req.body;
        await Agent.update(
            {
                matricule,
                lastname,
                firstname,
                birthday,
                adresse,
                cp,
                tel,
            },
            { where: { id } }
        ).then(res.redirect('/agents'));
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

const deleteAgent = catchAsync(async (req, res) => {
    const idAgent = req.params.id;
    console.log(idAgent);
    try {
        await Agent.destroy({ where: { id: idAgent } }).then(
            res.redirect('/agents/')
        );
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de l'effacement de l\'agent');
        res.redirect('/agents');
    }
});

const fillForm = async (req, res) => {
    const idAgent = req.params.id;

    try {
        //res.send(req.body);
        //console.log(req.body.matricule);
        if (!idAgent) {
            //req.flash('error', 'Le matricule ne doit pas être vide!');
            res.redirect('/agent/create');
            return;
        }
        const detailsAgent = await Agent.findAll({
            where: { id: idAgent },
        });
        console.log(detailsAgent[0].lastname);
        res.render('agent-edit', {
            title: "Modification d'un agent",
            id: detailsAgent[0].id,
            matricule: detailsAgent[0].matricule,
            lastname: detailsAgent[0].lastname,
            firstname: detailsAgent[0].firstname,
            birthday: detailsAgent[0].birthday,
            adresse: detailsAgent[0].adresse,
            cp: detailsAgent[0].cp,
            tel: detailsAgent[0].tel,
        });
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de la création de l\'agent');
        res.redirect('/agent/create');
    }
};

module.exports = {
    agents,
    createAgent,
    createAgentForm,
    getAll,
    deleteAgent,
    fillForm,
    updateAgent,
};
