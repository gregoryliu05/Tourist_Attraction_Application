const express = require('express');
const ratingService = require('../appServices/ratingService');

const router = express.Router();

// posts a rating to a location 
router.post('/insert-rating', async (req, res) => {
    const {ratingID, score, userID, postalCode, address} = req.body;
    const updateResult = await ratingService.addRating(ratingID, score, userID, postalCode, address);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})

// gets all ratings
router.get('/', async (req,res) => {
    const tableContent = await ratingService.getRatingsFromDb();
    res.json({data: tableContent});
})

// gets a rating by ID
router.get('/:ratingID', async (req,res) =>  {
    const {ratingID} = req.params;
    const viewResult = await ratingService.getRating(ratingID);
    res.json({data:viewResult});
})

// deletes a rating by ratingID 
router.delete('/:ratingID', async (req,res) => {
    const {ratingID} = req.params;
    const updateResult = await ratingService.deleteRating(ratingID);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})


module.exports = router;