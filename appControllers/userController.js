const express = require('express');
const userService = require('../appServices/userService');

const router = express.Router();

// Check database connection
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await userService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// Fetch all users
router.get('/', async (req, res) => {
    const tableContent = await userService.fetchUsersFromDb();
    res.json({ data: tableContent });
});

// Initiate users table
router.post('/initiate-users', async (req, res) => {
    const initiateResult = await userService.initiateUsers();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// Insert a user
router.post('/insert-users', async (req, res) => {
    const { userID, fullName, username, password, email } = req.body;
    console.log("Inserting User with:", { userID, fullName, username, password, email });
    const insertResult = await userService.insertUsers(userID, fullName, username, password, email);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// Update user name
router.post('/update-name-users', async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await userService.updateNameUsers(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// Count all users
router.get('/count-users', async (req, res) => {
    const tableCount = await userService.countUsers();
    if (tableCount >= 0) {
        res.json({
            success: true,
            count: tableCount
        });
    } else {
        res.status(500).json({
            success: false,
            count: tableCount
        });
    }
});

// Get user by ID
router.get('/:userID', async (req, res) => {
    const { userID } = req.params;
    const viewResult = await userService.getUserByID(userID);
    res.json({ data: viewResult });
});


// gets ratings based on userID
router.get('/:userID/ratings', async (req,res) => {
    const {userID} = req.params;
    const viewResult = await userService.getUsersRating(userID);
    res.json({data: viewResult});
})


module.exports = router;