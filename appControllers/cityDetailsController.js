const express = require('express');
const cityDetailsService = require('../appServices/cityDetailsService');
const router = express.Router();

router.get('/', async (req, res) => {
    const tableContent = await cityDetailsService.getCityDetailsFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

router.get('/:provinceState/:cityName', async (req, res) => {
    const {provinceState, cityName} = req.params;
    const tableContent = await cityDetailsService.getCityDetails(provinceState, cityName);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});

module.exports = router;