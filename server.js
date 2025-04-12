const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

const PORT = 3000;
const DATA_FILE = 'portfolioData.json';

app.use(cors());
app.use(express.json());

// Load data from file or start with empty object
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE));
  } catch {
    return {};
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let portfolioDB = loadData();

app.get('/portfolio/:userId', (req, res) => {
  const userId = req.params.userId;
  const userData = portfolioDB[userId] || { balance: 100000, stocks: {} };
  res.json(userData);
});

app.post('/portfolio/:userId', (req, res) => {
  const userId = req.params.userId;
  portfolioDB[userId] = req.body;
  saveData(portfolioDB);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
