const express = require('express');
const pictureService = require('../appServices/pictureService');
const router = express.Router();

router.get('/', async (req, res) => {
    const tableContent = await pictureService.getPictureFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

router.post('/add-picture', async (req, res) => {
    const {ratingID, image} = req.body;


    if (!ratingID || !image) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = await pictureService.addPicture(ratingID, image);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});

router.get('/:ratingID', async (req, res) => {
    const {ratingID} = req.params;
    const tableContent = await pictureService.getPicture(ratingID);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});

router.delete('/:ratingID', async (req, res) => {
    const {ratingID} = req.params;
    const updateResult = await pictureService.deletePicture(ratingID);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }

})

module.exports = router;