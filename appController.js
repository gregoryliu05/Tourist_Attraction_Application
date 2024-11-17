const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
// ADD VALIDATION IN THESE ENDPOINTS 
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/users', async (req, res) => {
    const tableContent = await appService.fetchUsersFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-users", async (req, res) => {
    const initiateResult = await appService.initiateUsers();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-users", async (req, res) => {
    const { userID, fullName, username, password, email } = req.body;
    console.log("Inserting User with:", { userID, fullName, username, password, email });
    const insertResult = await appService.insertUsers(userID, fullName, username, password, email);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-users", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameUsers(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-users', async (req, res) => {
    const tableCount = await appService.countUsers();
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


module.exports = router;