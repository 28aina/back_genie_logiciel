
const Livre = require('../Models/livreModel');
const Client = require('../Models/clientModel');
const Recommandation = require('../Models/recommandationModel');
const mongoose = require('mongoose');

// Méthode pour inserer les recommandation
const insererRecommandation = async (req, res) => {
  try {   
    const {id_client , id_livre , type_livre}= req.body;
    

    // Vérifier la validité de l'id_client 
    const isValidClientId = mongoose.Types.ObjectId.isValid(id_client);
    const isValidLivreId = mongoose.Types.ObjectId.isValid(id_livre);
    if (!isValidClientId) {
      return res.status(400).json({ message: `ID client invalide ou introuvable` });
    }
    // Vérifier la validité de l'id_livre
    if (!isValidLivreId) {
      return res.status(400).json({ message: `ID livre invalide ou introuvable` });
    }


    // On teste si le type de livre est deja recommandé
    const recommandationExist= await Recommandation.findOne({id_client , type_livre });
    if(!recommandationExist){
       // si client existe et type de livre n'est pas encore recommandé, on insere
        const recommandation = new Recommandation({
          id_client,
          id_livre,
          type_livre,
          countClick:1
        });
        await recommandation.save();
        return res.status(200).json({ message: `on insere` });  
    }else{
      //si client existe et type de livre deja recommandé ; on incremente 
      recommandationExist.countClick += 1 ;
      await recommandationExist.save();
      return res.status(400).json({ message: `on increment` });
    }

    

    
    
    
    res.status(200).json({ message: `recommandation pour client ${id_client} de lire des livres de types ${type_livre} est bien ajouter avec succès` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'insertion de recommandation' });
  }
};



const updateRecommandation = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_client, id_livre , type_livre , countClick } = req.body;

    // Vérifier à la fois l'existence et la validité de l'id_client et l'id_livre
    const isValidClientId = mongoose.Types.ObjectId.isValid(id_client);
    const isValidLivreId = mongoose.Types.ObjectId.isValid(id_livre);
    const clientExists = await Client.exists({ _id: id_client });
    const livreExists = await Client.exists({ _id: id_livre });
    if (!isValidClientId || !clientExists && !isValidLivreId || !livreExists) {
      return res.status(400).json({ message: 'ID client ou ID livre invalide ou non trouvé' });
    }else{
      const updatedRecommandation = await Recommandation.findByIdAndUpdate(
        id,
        { id_client, id_livre , type_livre , countClick: updateRecommandation.countClick + 1  }, 
        { new: true }
      );
      if (!updatedRecommandation) {
        res.status(404).send('Erreur de mis à jour');
      } else {
        res.send('Recommandation mis à jour avec succès');
      }
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la modification' });
  }
};




// Méthode pour recommander un client 
const recommanderClient = async (req, res) => {
   try {
     const { idClient } = req.params;
 
     const recommandation = await Recommandation.findOne(idClient);
 
     if (!recommandation) {
       return res.status(404).json({ message: `Aucun de recommandation pour ce client` });
     }else{
      return res.status(200).json({ message: `regarderna we ina no type efa ao, rah type ef mise atao plus ra type mbola tsis crer` });
     }
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Une erreur est survenue lors de la recommandation' });
   }
 };
 

module.exports = { insererRecommandation, updateRecommandation, recommanderClient  };
