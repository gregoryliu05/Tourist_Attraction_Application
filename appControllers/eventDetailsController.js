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

router.get('/:eventName/:host/:postalCode', async (req, res) => {
    const eventName = decodeURIComponent(req.params.eventName);
    const host = decodeURIComponent(req.params.host);
    const postalCode = req.params.postalCode;

    try {
        const tableContent = await eventDetailsService.getEventSearchAll(eventName, host, postalCode);
        if (tableContent.length > 0) {
            res.json({ data: tableContent });
        } else {
            res.status(404).json({ success: false, message: 'No matching events found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
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

router.get('/:eventName/:postalCode', async (req,res) => {
    const eventName = decodeURIComponent(req.params.eventName);
    const postalCode = req.params.postalCode;
    try {
        const tableContent = await eventDetailsService.getEventSearchNamePostalCode(eventName, postalCode);
        if (tableContent.length > 0) {
            res.json({ data: tableContent });
        } else {
            res.status(404).json({ success: false, message: 'No matching events found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/:eventName/:host', async (req,res) => {
    const eventName = decodeURIComponent(req.params.eventName);
    const host = decodeURIComponent(req.params.host);
    try {
        const tableContent = await eventDetailsService.getEventSearchNameHost(eventName, host);
        if (tableContent.length > 0) {
            res.json({ data: tableContent });
        } else {
            res.status(404).json({ success: false, message: 'No matching events found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// router.get('/:eventName', async (req,res) => {
//     const eventName = decodeURIComponent(req.params.eventName);
//     try {
//         const tableContent = await eventDetailsService.getEventSearchName(eventName);
//         if (tableContent.length > 0) {
//             res.json({ data: tableContent });
//         } else {
//             res.status(404).json({ success: false, message: 'No matching events found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

router.get('/:eventName', async (req, res) => {
    const eventName = decodeURIComponent(req.params.eventName).trim();
    const fields = req.query.fields ? req.query.fields.split(',') : ['*'];

    console.log('Received eventName:', eventName);
    console.log('Requested fields:', fields);

    try {
        const eventDetails = await eventDetailsService.getEventDetailsWithProjection(eventName, fields);

        if (eventDetails.length > 0) {
            console.log('Matching Event Details:', eventDetails);
            res.json({ data: eventDetails });
        } else {
            console.log('No matching events found for:', eventName);
            res.status(404).json({ success: false, message: 'No matching events found' });
        }
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});





module.exports = router;