const Habitation = require('../models/habitation');
const catchAsync = require('../helpers/catchAsync');

const habitations = catchAsync(async (req, res) => {
    // const [results, metadata] = await sequelize.query(
    //     "select*, DATE_FORMAT(datedebut,'%d-%m-%Y %H:%i') as dateDebutFormat, DATE_FORMAT(datefin,'%d-%m-%Y %H:%i') as dateFinFormat from gdp.habitations where datedebut <= now() and datefin >= now() order by datedebut asc"
    // );
    // console.log(results, metadata);
    const habitations = await Habitation.findAll();

    //console.log('All habitations:', JSON.stringify(habitations, null, 2));

    res.render('habitations', {
        title: 'Listing des habitations',
        //Habitations
        habitations,
        errors: req.flash('error'),
    });
});

const getAll = catchAsync(async (req, res) => {
    const habitations = await Habitation.findAll()
        .then((habitations) => {
            res.status(200).json(habitations);
        })
        .catch((error) => res.status(500).json(error));
});

const createHabitation = async (req, res) => {
    const {
        adresse,
        cp,
        localite,
        demandeur,
        datedebut,
        datefin,
        mesures,
        vehicule,
        googlemap,
    } = req.body;
    try {
        //res.send(req.body);
        //console.log(req.body);

        if (!adresse || !localite || !demandeur) {
            req.flash('error', 'Certains champs ne peuvent pas être vides!');
            //res.redirect('/habitation/create');
            return;
        }

        await Habitation.create({
            adresse,
            cp,
            localite,
            demandeur,
            datedebut,
            datefin,
            mesures,
            vehicule,
            googlemap,
        });
        res.redirect('/habitations');
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de la création de l\'habitation');
        res.redirect('/habitations/create');
    }
};

const updateHabitation = async (req, res) => {
    const {
        id,
        adresse,
        cp,
        localite,
        demandeur,
        datedebut,
        datefin,
        mesures,
        vehicule,
        googlemap,
        created,
    } = req.body;
    try {
        if (!adresse || !datedebut || !datefin) {
            req.flash('error', 'Certains champs ne peuvent pas être vides!');
            res.redirect(`/habitations/${id}`);
            return;
        }

        console.log(req.body.adresse);

        await Habitation.update(
            {
                adresse,
                cp,
                localite,
                demandeur,
                datedebut,
                datefin,
                mesures,
                vehicule,
                googlemap,
                created,
            },
            { where: { id } }
        ).then(res.redirect('/'));
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de la création de l'habitation");
        res.redirect('/habitations/create');
    }
};

const createHabitationForm = (req, res) => {
    res.render('habitations', {
        title: 'Nouvelle habitation',
        errors: req.flash('error'),
    });
};

const deleteHabitation = catchAsync(async (req, res) => {
    const idHabitation = req.params.id;
    console.log(idHabitation);
    try {
        await Habitation.destroy({ where: { id: idHabitation } }).on(
            'success',
            //await Agent.destroy({ where: { id: idAgent } }).then(
            res.header('Refresh', '1'),
            res.redirect('/habitations/')
        );
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de l'effacement de l'habitation");
        return; //res.redirect('/habitations');
    }
});

const fillForm = async (req, res) => {
    const idHabitation = req.params.id;
    try {
        if (!idHabitation) {
            //req.flash('error', 'Le matricule ne doit pas être vide!');
            res.redirect('/habitations/create');
            return;
        }
        const detailsHabitation = await Habitation.findAll({
            where: { id: idHabitation },
        });

        //console.log(detailsHabitation[0].adresse);
        res.render('habitations-edit', {
            title: "Modification d'un habitation",
            id: detailsHabitation[0].id,
            adresse: detailsHabitation[0].adresse,
            cp: detailsHabitation[0].cp,
            localite: detailsHabitation[0].localite,
            demandeur: detailsHabitation[0].demandeur,
            datedebut: detailsHabitation[0].datedebut,
            datefin: detailsHabitation[0].datefin,
            mesures: detailsHabitation[0].mesures,
            vehicule: detailsHabitation[0].vehicule,
            googlemap: detailsHabitation[0].googlemap,
            errors: req.flash('error'),
        });
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de l'update de l'habitation");
        res.redirect('/habitations/create');
    }
};
const habitationListe = catchAsync(async (req, res) => {
    const habitations = await Habitation.findAll({});

    res.render('habitations-validation', {
        url: req.url,
        title: 'Validation des habitations',
        habitations,
        errors: req.flash('error'),
    });
});
const habitationListeLocalite = catchAsync(async (req, res) => {
    const localite = req.params.localite;
    const habitations = await Habitation.findAll({
        if(localite) {
            where: {
                localite: localite;
            }
        },
    });
    //res.json({ habitations });
    res.render('habitations-validation', {
        url: req.url,
        title: 'Validation des habitations',
        habitations,
        errors: req.flash('error'),
    });
});
module.exports = {
    habitations,
    createHabitation,
    createHabitationForm,
    getAll,
    deleteHabitation,
    fillForm,
    updateHabitation,
    habitationListe,
    habitationListeLocalite,
};
