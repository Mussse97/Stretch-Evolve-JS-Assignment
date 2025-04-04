// importing necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3001;

// Gets user data from the randomuser.me API
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, results = 10, gender } = req.query;

    let apiUrl = `https://randomuser.me/api/?page=${page}&results=${results}`;
    
    // adding gender fillter
    if (gender) {
      apiUrl += `&gender=${gender}`; 
    }
   
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