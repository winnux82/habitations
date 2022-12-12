const Agent = require('../models/agent')
const catchAsync = require('../helpers/catchAsync')

const agents = catchAsync(async (req, res) => {
    const agents = await Agent.findAll();
        //console.log(agents);
    res.render('agents', {
        title: 'Les agents',
        //Agents
        agents: agents
    });
});

const createAgent = catchAsync(async (req, res) => {
    try {

        console.log(req.body);


        // if (!req.body.matricule) {
        //     //req.flash('error', 'Le matricule ne doit pas être vide!');
        //     res.redirect('/agent/create');
        //     return;

        // }
        // await Agent.create({
        //     matricule: req.body.matricule,
        //     nom: req.body.lastname,  
        //     prenom: req.body.firstname,
        //     datedenaissance: req.body.date,
        //     adresse: req.body.adresse,
        //     cp: req.body.cp,
        //     tel: req.body.tel,
        // });
        // res.redirect('/agents');
    } catch (err) {
        console.log(err);
        //req.flash('error', 'Erreur lors de la création de l\'agent');
        res.redirect('/agent/create');
   }
});


//=>/agents/list
const listeAgents = catchAsync(async (req, res) => {

    const listeAgents = await Agent.findAll();
    console.log(listeAgents.every(agent => agent instanceof Agent)); // true
    console.log("All agents:", JSON.stringify(agents,null,2));
    res.render('agents[2]', {
        title: 'Liste des Agents',

    });
});

const fun = async () => {
    const coucous = await Agent.findAll({
    })
    console.log(JSON.stringify(coucous,null,2))
}


const listeAgents2 = catchAsync(async (req, res) => 
    Agent.findAll()
        .then(agents => res.render('agents',
            {
        title: 'Agents',
        agents
      }))
    .catch(err => res.render('error', {error: err})));



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
    createAgent,
    createAgentForm,
    getAll,
    listeAgents,
    listeAgents2,
    fun

}