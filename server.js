const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const secretKey = "supersecretkey";

app.use(bodyParser.json());
app.use(express.static('public'));

// Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

// Admin
app.get('/adminpage', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/admin.html'));
});


const users = [{ username: 'user', password: 'pass', role: 'user' }];

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password, role: 'user' });
    res.send('User registered successfully.');
});

// Login
app.post('/loginapi', (req, res) => { // renamed to /loginapi for clarity
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, secretKey);
        res.json({ token });
    } else {
        res.status(401).send('Unauthorized');
    }
});


function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('No token provided');

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.decode(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send('Invalid token');
    }
}


app.get('/admin', authenticate, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
    res.send('FLAG{jwt_logic_flaw}');
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
