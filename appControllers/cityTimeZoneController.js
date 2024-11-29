const express = require('express');
const cityTimeZoneService = require('../appServices/cityTimeZoneService');
const router = express.Router();

router.get('/', async (req, res) => {
    const tableContent = await cityTimeZoneService.getCityTimeZoneFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

router.get('/:provinceState/:country', async (req, res) => {
    const {provinceState, country} = req.params;
    const tableContent = await cityTimeZoneService.getCityTimeZone(provinceState, country);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});

module.exports = router;