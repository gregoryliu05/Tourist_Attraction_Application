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
    
    const tableContent = await userService.getUsersRating(userID);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get ratings based on userID'});
    }
})

// getting bookings based on userID
router.get('/:userID/bookings', async (req,res ) => {
    const {userID} = req.params;
    const tableContent = await userService.getUsersBookings(userID);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookings based on userID'});
    }
})


// update users Password
router.post('/:userID/update-password', async (req, res) => {
    const {userID} = req.params;
    const {newPassword} = req.body;

    if (!newPassword || newPassword.length < 8 || newPassword.length > 25) { 
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long with a max of 25 chars"
        });
    }

    const updateResult = await userService.updateUserPassword(userID, newPassword);
    if (updateResult) {
        res.json({success: true, message: "password updated"});
    } else {
        res.status(500).json({success: false, message: "failed to update password"});
    }
})

// get a user from username and password
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    const update = await userService.getUserFromUsernameAndPassword(username, password);
    if (update) {
        res.json({ success: true, message: "Login success!" });
    } else {
        res.status(500).json({ message: 'Invalid username or password' });
    }
});



module.exports = router;