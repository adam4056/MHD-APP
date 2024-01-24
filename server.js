// Import potřebných knihoven
const express = require('express');
const cors = require('cors');

// Vytvoření instance Express aplikace
const app = express();

// Použití middleware pro povolení CORS
app.use(cors());

// Definice jednoduchého API endpointu
app.get('/', (req, res) => {
  res.json({ message: 'Ahoj z API!' });
});

// Nastavení portu, na kterém bude server poslouchat
const port = 7000;

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});
