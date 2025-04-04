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
    const { page = 1, results = 20, gender } = req.query;

    // Skapa API-url UTAN seed
    let apiUrl = `https://randomuser.me/api/?page=${page}&results=${results}`;

    if (gender) {
      apiUrl += `&gender=${gender}`; // Lägg till könsfilter
    }

    console.log("Fetching from API:", apiUrl); // Debugga API-anropet

    const response = await axios.get(apiUrl);
    res.json(response.data.results);
  } catch (error) {
    console.error("API Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});