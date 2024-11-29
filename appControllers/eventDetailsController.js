const express = require('express');
const eventDetailsService = require('../appServices/eventDetailsService');
const router = express.Router();

router.get('/', async (req, res) => {
    const tableContent = await eventDetailsService.getEventDetailsFromDb();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

router.post('/add-eventDetail', async (req, res) => {
    const {eventName, startTime, duration, host, postalCode, address} = req.body;


    if (!eventName || !startTime || !duration || !host || !postalCode || !address) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = await eventDetailsService.addEventDetails(eventName, startTime, duration, host, postalCode, address);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});

router.get('/:eventName/:startTime/:duration', async (req, res) => {
    const {eventName, startTime, duration} = req.params;
    const tableContent = await eventDetailsService.getEventDetails(eventName, startTime, duration);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});

router.delete('/:eventName/:startTime/:duration', async (req, res) => {
    const {eventName, startTime, duration} = req.params;
    const updateResult = await eventDetailsService.deleteEventDetails(eventName, startTime, duration);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }

})

module.exports = router;