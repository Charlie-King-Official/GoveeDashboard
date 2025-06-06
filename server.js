const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


// Serve index.html at root
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/get-device-state', async (req, res) => {
  try {
    const response = await axios.post(
      'https://openapi.api.govee.com/router/api/v1/device/state',
      {
        requestId: "uuid",
        payload: {
          sku: "H7140",
          device: "13:F7:E8:06:90:19:4C:70"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Govee-API-Key': process.env.GOVEE_API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Govee API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch device state' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
