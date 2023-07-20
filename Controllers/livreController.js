// pour la suppression des files dans le dossiers uploads
const fs = require('fs-extra');
const path = require('path');

const Livre = require('../Models/livreModel');
const Client = require('../Models/clientModel');
const mongoose = require('mongoose');

// Méthode pour uploader un livre
const uploadLivre = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun livre n\'a été envoyé' });
    }
    const { originalname, filename , path} = req.file;
    const { id_client, titre } = req.body;

    // Vérifier à la fois l'existence et la validité de l'id_client
    const isValidClientId = mongoose.Types.ObjectId.isValid(id_client);
    const clientExists = await Client.exists({ _id: id_client });
    if (!isValidClientId || !clientExists) {
      return res.status(400).json({ message: 'ID client invalide ou non trouvé' });
    }

    // si id_client est valid et existe on insere le livre 
    const livre = new Livre({
      id_client,
      titre,
      originalname,
      filename: originalname, // Utilisation de originalname comme nom de fichier
      filePath: path , // Stockage du chemin d'accès du fichier
      
    });
    await livre.save();
    res.status(200).json({ message: 'Livre uploadé avec succès' });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'upload du livre' });
  }
};



const updateLivre = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun livre n\'a été envoyé' });
    }
    const { id } = req.params;
    const { originalname, filename , path } = req.file;
    const { id_client, titre } = req.body;
    const livre = await Livre.findById(id);

    // Vérifier à la fois l'existence et la validité de l'id_client
    const isValidClientId = mongoose.Types.ObjectId.isValid(id_client);
    const clientExists = await Client.exists({ _id: id_client });
    if (!isValidClientId || !clientExists) {
      return res.status(400).json({ message: 'ID client invalide ou non trouvé' });
    }else{
      const updatedLivre = await Livre.findByIdAndUpdate(
        id,
        { id_client, titre , originalname, filename : originalname , filePath: path  }, 
        { new: true }
      );
  
      if (!updatedLivre) {
        res.status(404).send('Erreur de mis à jour');
      } else {
        res.send('Livre mis à jour avec succès');
        // Supprimer le fichier associé
        const filePath = livre.filePath;
        await fs.remove(filePath);
      }
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'upload du livre' });
  }
};




// Méthode pour obtenir tous les livres
const getAllLivres = async (req, res) => {
  try {
    const livres = await Livre.find();

    res.status(200).json({ livres });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des livres' });
  }
};

// Méthode pour supprimer un livre
const deleteLivre = async (req, res) => {
  try {
    const { id } = req.params;

    const livre = await Livre.findById(id);

    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    // Supprimer le fichier associé
    const filePath = livre.filePath;
    await fs.remove(filePath);

    // Supprimer le livre de la base de données
    await livre.deleteOne({ _id: id });

    res.status(200).json({ message: 'Livre supprimé avec succès', livre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du livre' });
  }
};


// Méthode pour obtenir un livre par son ID
const getByIdLivre = async (req, res) => {
  try {
    const { id } = req.params;

    const livre = await Livre.findById(id);

    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.status(200).json({ livre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du livre' });
  }
};

module.exports = { uploadLivre, updateLivre, getAllLivres, deleteLivre, getByIdLivre };
