const express = require('express');
const clientController = require('../Controllers/clientController');

const router = express.Router();

// Récupérer tous les clients
router.get('/clients', clientController.getAllClients);

// Récupérer un client par ID
router.get('/clients/:id', clientController.getClientById);

// Créer un nouveau client
router.post('/clients', clientController.createClient);

// Mettre à jour un client existant
router.put('/clients/:id', clientController.updateClient);

// Supprimer un client
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;
