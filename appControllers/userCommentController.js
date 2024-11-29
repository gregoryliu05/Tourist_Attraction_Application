const express = require('express');
const userCommentsService = require('../appServices/userCommentsService');
const router = express.Router();

// get all userComments
router.get('/', async (req, res) => {
    const tableContent = await userCommentsService.getUserCommentFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

// add a userComments item
router.post('/add-userComments', async (req, res) => {
    const {ratingID, text} = req.body;

    if (!ratingID || !text) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = await userCommentsService.addUserComment(ratingID, text);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});


// get a userComments item
router.get('/:ratingID', async (req, res) => {
    const {ratingID} = req.params;
    const tableContent = await userCommentsService.getUserComment(ratingID);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});


// delete a bookable item
router.delete('/:ratingID', async (req, res) => {
    const {ratingID} = req.params;
    const updateResult = await userCommentsService.deleteUserComment(ratingID);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }

})

module.exports = router;