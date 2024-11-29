const express = require('express');
const categorizesService = require('../appServices/categorizesService');
const router = express.Router();

router.get('/', async (req, res) => {
    const tableContent = await categorizesService.getCategorizesFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

router.post('/add-categorizes', async (req, res) => {
    const {catName, postalCode, address} = req.body;


    if (!catName || !postalCode || !address) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = await categorizesService.addCategorizes(catName, postalCode, address);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});

router.get('/:catName/:postalCode/:addressingID', async (req, res) => {
    const {catName, postalCode, address} = req.params;
    const tableContent = await categorizesService.getCategorizes(catName, postalCode, address);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});

router.delete('/:catName/:postalCode/:addressingID', async (req, res) => {
    const {catName, postalCode, address} = req.params;
    const updateResult = await categorizesService.deleteCategorizes(catName, postalCode, address);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }

})

module.exports = router;