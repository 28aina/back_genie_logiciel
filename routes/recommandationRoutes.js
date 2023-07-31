const express = require('express');
const recommandationController = require('../Controllers/recommandationController');

const router = express.Router();

// Récupérer tous les clients
router.get('/recommander', recommandationController.recommanderClient);

// si le type de livre n'existe pas encore, on utilise cette route pour l'inserer
router.post('/inserer-recommandation', recommandationController.insererRecommandation);

// si le type de livre existe, on passe a l'incrementation  
router.put('/update-recommandatiom/:id', recommandationController.updateRecommandation);



module.exports = router;
