const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get logged in user data
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// Delete a user's account
// todo

// Login a registered user
router.post('/users/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Log user out of the application
router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Log user out of all devices
router.post('/users/me/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add user's new entry to database
router.post('/entries', auth, async (req, res) => {
    try {
        // push new entry object to entries array of user in db
        const newEntry = {
            rating: req.body.rating,
            datetime: req.body.datetime,
            notes: req.body.notes,
            location: req.body.location,
            weather: {}
        };
        req.user.entries.push(newEntry);
        await req.user.save();
        // return the updated list of entries
        res.send(req.user.entries)
    } catch (error) {
        res.status(400).send(error); // todo change status?
    }
});

// Get array of all user's entries
router.get('/entries', auth, async (req, res) => {
    res.send(req.user.entries);
});

// Modify a user's existing entry
router.put('/entries/:entryId', auth, async (req, res) => {

    try {
        // get entry with the correct id from the database
        const oldEntry = req.user.entries.find(
            entry => entry._id === req.params.entryId
        );
        // replace the old entry data with the updated one
        Object.assign(oldEntry, req.body);
        // update the database
        await req.user.save();
        // return the updated list of entries
        res.send(req.user.entries);

    } catch (error) {
        res.status(400).send(error); // todo change status?
    }
});

// Delete a user's existing entry
router.delete('/entries/:entryId', auth, async (req, res) => {
    try {
        // make array of all entries excluding the one being deleted
        const currentEntries = req.user.entries.filter(
            entry => entry._id != req.params.entryId
        );
        // update the user's list of entries with the array
        req.user.entries = currentEntries;
        await req.user.save();
        // return the updated list of entries
        res.send(req.user.entries);

    } catch (error) {
        res.status(400).send(error); // todo change status?
    }
});

module.exports = router