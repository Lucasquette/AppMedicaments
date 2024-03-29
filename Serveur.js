const express = require('express');
const cors = require('cors');
const fs = require('fs');
const readline = require('readline');

const app = express();

// Middleware pour gérer les CORS et le JSON
app.use(cors());
app.use(express.json());

// Fonction pour parser une ligne du fichier et retourner un objet médicament
const parseMedicineLine = (line) => {
  // Retire les guillemets et divise la ligne en utilisant le point-virgule comme séparateur
  const fields = line.replace(/"/g, '').split(';');
  return {
    cip: fields[0],
    name: fields[1],
    // Vous pouvez ajouter d'autres champs ici si nécessaire
  };
};

// Fonction de recherche dans une base de données à partir d'un fichier texte
const findMedicineByCip = async (cipCode) => {
const fileStream = fs.createReadStream('assets/data/medicament.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const medicine = parseMedicineLine(line);
    if (medicine.cip === cipCode) {
      return medicine;
    }
  }

  return null; // Si le médicament n'est pas trouvé, retourner null
};

// Route pour rechercher un médicament par code CIP
app.get('/api/medicaments/:cip', async (req, res) => {
  try {
    const { cip } = req.params;
    const medicine = await findMedicineByCip(cip);
    if (medicine) {
      res.json(medicine);
    } else {
      res.status(404).json({ message: 'Médicament non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
