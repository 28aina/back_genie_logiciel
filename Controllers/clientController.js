const Client = require('../Models/clientModel');

// Méthode pour creer un client 
exports.createClient = async (req, res) => {
  try {
    const {username, email, telephone } = req.body;
    const client = new Client({ username, email, telephone });
    await client.save();
    res.send('Client créé avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Méthode pour obtenir tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};


// Méthode pour obtenir tous un livre
exports.getClientById = async (req, res) => {
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
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, telephone } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { username, email, telephone },
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
exports.deleteClient = async (req, res) => {
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
