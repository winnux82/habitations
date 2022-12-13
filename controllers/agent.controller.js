const Agent = require('../models/agent');
const catchAsync = require('../helpers/catchAsync');

const agents = catchAsync(async (req, res) => {
    const agents = await Agent.findAll();

    //console.log('All agents:', JSON.stringify(agents, null, 2));

    res.render('agents', {
        title: 'Listing des agents',
        //Agents
        agents,
        errors: req.flash('error'),
    });
});

const getAll = catchAsync(async (req, res) => {
    const agents = await Agent.findAll()
        .then((agents) => {
            res.status(200).json(agents);
        })
        .catch((error) => res.status(500).json(error));
});

const createAgent = async (req, res) => {
    const { matricule, lastname, firstname, birthday, adresse, cp, tel } =
        req.body;
    try {
        //res.send(req.body);
        //console.log(req.body.matricule);

        if (!matricule || !lastname || !firstname) {
            req.flash('error', 'Certains champs ne peuvent pas être vides!');
            //res.redirect('/agent/create');
            return;
        }

        await Agent.create({
            matricule,
            lastname,
            firstname,
            birthday,
            adresse,
            cp,
            tel,
        }).then(
            console.log(
                `----------->L\'agent ${matricule} a bien été créé<-----------`
            )
        );

        res.redirect('/agents');
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de la création de l\'agent');
        res.redirect('/agent/create');
    }
};

const updateAgent = async (req, res) => {
    const { id, matricule, lastname, firstname, birthday, adresse, cp, tel } =
        req.body;
    try {
        if (!matricule || !lastname || !firstname) {
            req.flash('error', 'Certains champs ne peuvent pas être vides!');
            res.redirect(`/agent/${id}`);
            return;
        }

        console.log(req.body.matricule);

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
        ).then(
            res.redirect('/agents'),
            console.log(
                `----------->L\'agent ${matricule} a bien été modifié<-----------`
            )
        );
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de la création de l'agent");
        res.redirect('/agent/create');
    }
};

const createAgentForm = (req, res) => {
    res.render('agents-new', {
        title: 'Nouvel agent',
        errors: req.flash('error'),
    });
};

const deleteAgent = catchAsync(async (req, res) => {
    const idAgent = req.params.id;
    console.log(idAgent);
    try {
        await Agent.destroy({ where: { id: idAgent } }).on(
            'success',
            //await Agent.destroy({ where: { id: idAgent } }).then(
            res.header('Refresh', '10'),
            res.redirect('/agents/'),
            console.log(
                `----------->L\'agent ${matricule} a bien été effacé<-----------`
            )
        );
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de l'effacement de l'agent");
        return; //res.redirect('/agents');
    }
});

const fillForm = async (req, res) => {
    const idAgent = req.params.id;
    try {
        if (!idAgent) {
            //req.flash('error', 'Le matricule ne doit pas être vide!');
            res.redirect('/agent/create');
            return;
        }
        const detailsAgent = await Agent.findAll({
            where: { id: idAgent },
        });
        console.log(detailsAgent[0].lastname);
        res.render('agents-edit', {
            title: "Modification d'un agent",
            id: detailsAgent[0].id,
            matricule: detailsAgent[0].matricule,
            lastname: detailsAgent[0].lastname,
            firstname: detailsAgent[0].firstname,
            birthday: detailsAgent[0].birthday,
            adresse: detailsAgent[0].adresse,
            cp: detailsAgent[0].cp,
            tel: detailsAgent[0].tel,
            errors: req.flash('error'),
        });
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de l'update de l'agent");
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
