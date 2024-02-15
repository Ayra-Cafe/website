const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS, etc.)

// MongoDB setup (replace with your own MongoDB connection string)
mongoose.connect('mongodb://localhost/my-discord-db',
);

// Define MongoDB schema and model for ban appeals
const banAppealSchema = new mongoose.Schema({
    username: String,
    reason: String,
});
const BanAppeal = mongoose.model('BanAppeal', banAppealSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit-ban-appeal', async (req, res) => {
    const { username, reason } = req.body;
    try {
        const newBanAppeal = await BanAppeal.create({ username, reason });
        console.log(`Ban appeal submitted by ${username}: ${reason}`);
        res.status(200).send('Ban appeal submitted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting ban appeal.');
    }
});

// Add subscription management routes (similar setup)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
