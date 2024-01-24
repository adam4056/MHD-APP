const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const port = 3500;

app.use(cors());

app.get('/api/hello', async (req, res) => {
  try {
    const options = {
      hostname: 'www.dszo.cz',
      path: '/online/tabs2.php',
      method: 'GET',
    };

    const apiRequest = https.request(options, (apiResponse) => {
      let data = '';

      apiResponse.on('data', (chunk) => {
        data += chunk;
      });

      apiResponse.on('end', () => {
        // Zpracování odpovědi a odeslání klientovi
        res.json({ message: JSON.parse(data) });
      });
    });

    apiRequest.on('error', (error) => {
      console.error('Chyba při volání API:', error.message);
      res.status(500).json({ error: 'Interní chyba serveru' });
    });

    apiRequest.end();
  } catch (error) {
    console.error('Chyba:', error.message);
    res.status(500).json({ error: 'Interní chyba serveru' });
  }
});

app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});
