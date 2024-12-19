const express = require('express');
const router = express.Router();
const Football = require('../models/football'); // Correct path to the model

// Fetch stats for a specific year
router.get('/stats/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year); // Convert year to a number
        console.log('Querying for year:', year); // Log the year being queried
        const query = { Year: year }; // Query object
        console.log('Query Object:', query); // Log the query object
        const stats = await Football.find(query); // Query MongoDB
        console.log('Stats fetched:', stats); // Log the fetched stats
        res.json(stats); // Send the results as JSON
    } catch (error) {
        console.error('Error:', error); // Log any error
        res.status(500).json({ message: 'Error fetching stats', error });
    }
});

// Add a new team
router.post('/add', async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the incoming data
        const newTeam = new Football(req.body); // Create a new record
        await newTeam.save(); // Save the record to the database
        res.status(201).json(newTeam); // Send back the saved record
    } catch (error) {
        console.error('Error adding team:', error); // Log any errors
        res.status(500).json({ message: 'Error adding team', error });
    }
});

// Update team data
router.post('/update', async (req, res) => {
    try {
        const { Team, ...updates } = req.body; // Extract the team name and update fields
        const updatedTeam = await Football.findOneAndUpdate(
            { Team }, // Find the document by team name
            updates, // Apply the updates
            { new: true } // Return the updated document
        );
        res.json(updatedTeam); // Send back the updated document
    } catch (error) {
        console.error('Error updating team:', error); // Log any errors
        res.status(500).json({ message: 'Error updating team', error });
    }
});

// Delete a team
router.post('/delete', async (req, res) => {
    try {
        const { Team } = req.body; // Extract the team name from the request body
        const deletedTeam = await Football.findOneAndDelete({ Team }); // Delete the document
        res.json(deletedTeam); // Send back the deleted document
    } catch (error) {
        console.error('Error deleting team:', error); // Log any errors
        res.status(500).json({ message: 'Error deleting team', error });
    }
});

module.exports = router;
