const Validation = require('../models/validation');
const catchAsync = require('../helpers/catchAsync');
('use strict');
const nodemailer = require('nodemailer');
const moment = require('moment');
require('dotenv').config({ path: '.env.config' });

const habitationValidation = async (req, res) => {
    const { agent, adresse, message } = req.body;

    try {
        //res.send(req.body);
        console.log(req.body);

        if (!adresse || !agent) {
            //req.flash('error', 'Certains champs ne peuvent pas être vides!');
            res.redirect('/habitations/validation');
            return;
        }

        await Validation.create({
            agent,
            adresse,
            message,
            date: new Date(),
        });
        dataSubject = 'Nouvelle entrée pour ' + adresse;
        dataMessage =
            'Ce ' +
            moment(new Date()).format('YYYY/MM/DD à HH:mm') +
            ' A' +
            agent +
            ", agent GDP, s'est rendu à lhabitation " +
            adresse +
            ' et a communiqué le commentaire suivant :' +
            message;
        dataHTML =
            'Ce ' +
            moment(new Date()).format('YYYY/MM/DD à HH:mm') +
            '<b> A' +
            agent +
            "</b>, agent GDP, s'est rendu à lhabitation <b>" +
            adresse +
            '</b> et a communiqué le commentaire suivant :<p>' +
            message +
            '</p>';
        SendMail(dataSubject, dataMessage, dataHTML).catch(console.error);

        res.redirect('/habitations/validation');
    } catch (err) {
        console.log(err);
        //req.flash('error', "Erreur lors de la validation de l'habitation");
        res.redirect('/habitations/validation');
    }
};

// async..await is not allowed in global scope, must use a wrapper
async function SendMail(dataSubject, dataMessage, dataHTML) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT_HOST,
        secure: true, // true for 465, false for other ports
        auth: {
            user: MAIL_USER, // generated ethereal user
            pass: MAIL_PWD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Service GDP Mouscron 👻" <contact@gdlp.be>', // sender address
        to: 'christophe.vandermeulen@mouscron.be', // list of receivers
        subject: dataSubject, // Subject line
        text: dataMessage, // plain text body
        html: dataHTML, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//SendMail().catch(console.error);

const validations = catchAsync(async (req, res) => {
    const validations = await Validation.findAll();

    //console.log('All validations:', JSON.stringify(validations, null, 2));

    res.render('validations', {
        title: 'Listing des validations',
        //Agents
        validations,
        errors: req.flash('error'),
    });
});

const getAll = catchAsync(async (req, res) => {
    const validations = await Validation.findAll()
        .then((validations) => {
            res.status(200).json(validations);
        })
        .catch((error) => res.status(500).json(error));
});

const deleteValidation = catchAsync(async (req, res) => {
    const idValidation = req.params.id;
    try {
        await Validation.destroy({ where: { id: idValidation } }).on(
            'success',
            //await Agent.destroy({ where: { id: idAgent } }).then(
            res.header('Refresh', '1'),
            res.redirect('/validations/')
        );
    } catch (err) {
        console.log(err);
        req.flash('error', "Erreur lors de l'effacement de la validation");
        return; //res.redirect('/habitations');
    }
});
module.exports = {
    habitationValidation,
    validations,
    getAll,
    deleteValidation,
};
