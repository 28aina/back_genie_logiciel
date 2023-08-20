const express = require('express');
const router = express.Router();
const multer = require('multer');
const controllerLivre= require('../Controllers/livreController');
//importation pour proteger les routes
//const {verificationtoken}=require('../Midllewares/token');

// Configuration de Multer pour l'upload des livres
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire de destination des livres uploadés
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nom du livre sauvegardé sur le serveur
  }
});
const upload = multer({ storage });
const {verifyAccessToken}=require('../Midllewares/token');

// Route pour l'upload du livre  
router.post('/upload', upload.single('livre'), controllerLivre.uploadLivre);


// Route pour mettre à jour un livre
router.put('/livres/:id',upload.single('livre'), controllerLivre.updateLivre);

// Route pour obtenir tous les livres
router.get('/livres', controllerLivre.getAllLivres);

// Route pour supprimer un livre
router.delete('/livres/:id', controllerLivre.deleteLivre);

// Route pour obtenir un livre par son ID
router.get('/livres/:id', controllerLivre.getByIdLivre);
// Route pour chercher un livre par titre
router.post('/chercheTitreLivre',controllerLivre.chercheTitreLivre);

module.exports = router;
