// importering express and axios
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3001;

// Hämta users data
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, results = 20 } = req.query; // börjar med 20 användare per sida
    const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=${results}`);
    res.json(response.data.results); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});