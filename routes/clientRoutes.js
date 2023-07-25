const express = require('express');

const router = express.Router();
const clientController = require('../Controllers/clientController');
//importation pour proteger les routes
const {verifyAccessToken}=require('../Midllewares/token');



// Récupérer tous les clients
router.get('/clients',verifyAccessToken, clientController.getAllClients);

// Récupérer tous les clients
router.get('/auth', clientController.authentificationClient);

// Récupérer un client par ID
router.get('/clients/:id', clientController.getClientById);

// Créer un nouveau client
router.post('/clients', clientController.createClient);

// Mettre à jour un client existant
router.put('/clients/:id', clientController.updateClient);

// Supprimer un client
router.delete('/clients/:id', clientController.deleteClient);


module.exports = router;
