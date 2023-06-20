const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// Database or user data storage
const users = [
    {
        email: 'user1@example.com',
        password: 'password1',
    },
    {
        email: 'user2@example.com',
        password: 'password2',
    },
];
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = users.find((user) => user.email === email);

    if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
        // Incorrect password
        return res.status(401).json({ message: 'User not authorized' });
    }

    // Login successful
    return res.json({ message: 'User login successful' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});