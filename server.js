const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/api', async (req, res) => {
    try {
        const response1 = await axios.get('http://online.dszo.cz/delay.php');
        const response2 = await axios.get('https://www.dszo.cz/online/zastavky_json.php');
        const data1 = response1.data.split(';');
        const data2 = JSON.parse(response2.data);
        const result = {
            cisloLinky: data1[3],
            cisloVozu: data1[0],
            posledniZastavka: data2.root.find(z => z.pasport === data1[1].substring(0, 3) && z.sloupek === data1[1].substring(3)).nazev,
            konecnaZastavka: data2.root.find(z => z.pasport === data1[8].substring(0, 3) && z.sloupek === data1[8].substring(3)).nazev,
            souradnice: { lat: data1[9], lon: data1[10] }
        };
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));