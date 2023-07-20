const Client = require('../Models/clientModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const createClient = async (req, res) => {
  try {
    const { username, email, telephone, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà' });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const client = new Client({
      username,
      email,
      telephone,
      password : hashedPassword
    });

    await client.save();
    res.status(201).json({ message: 'Client créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du client' });
  }
};


// Méthode pour obtenir tous les clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};


// Méthode pour obtenir tous un livre
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).send('Client non trouvé');
    } else {
      res.json(client);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Méthode pour mette a jour les clients
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, telephone , password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { username, email, telephone , password : hashedPassword},
      { new: true }
    );
    if (!updatedClient) {
      res.status(404).send('Client non trouvé');
    } else {
      res.send('Client mis à jour avec succès');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};


// Méthode pour supprimer un client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndRemove(id);
    if (!deletedClient) {
      res.status(404).send('Client non trouvé');
    } else {
      res.send('Client supprimé avec succès');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};


// Méthode pour s'authantifier client
const authentificationClient = async (req, res) => {
  try {
    const { email , password } = req.body ;
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      if(bcrypt.compareSync( password, existingClient.password)) {
        res.send('Login correct');
        //mamelona token 
      }else{
        res.status(404).send('Mot de passe incorrect');
      }
    }else{
      res.status(404).send('Email ne correspond à  aucun compte');
    }


  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};



module.exports = { updateClient , getAllClients , deleteClient , createClient, getClientById , authentificationClient};