const express = require('express');
const categoryService = require('../appServices/categoryService');
const router = express.Router();

router.get('/', async (req, res) => {
    const tableContent = await categoryService.getCategoryFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

router.get('/:catName', async (req, res) => {
    const {catName} = req.params;
    const tableContent = await categoryService.getCategory(catName);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});

module.exports = router;