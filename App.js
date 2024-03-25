app.post('/register', (req, res) => {
  const userData = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    // Log existing user data
    console.log('Existing users:', users);
    
    users.push(userData);
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'User registered successfully' });
    });
  });
});
