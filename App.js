const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'user.json'); 


app.get('/user', (req, res) => {

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
      const user = JSON.parse(data);
      res.json(user);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
