const express = require('express');
const bookingService = require('../appServices/bookingService');
const router = express.Router();


// get all Bookings
router.get('/', async (req, res) => {
     const viewResult = await bookingService.getAllBookings();
     if (viewResult.length > 0) {
        res.json({data: viewResult});
     } else {
        res.status(404).json({success:false, message: 'failed to get bookings'});
     }
})



// add a booking 
router.post('/add-booking', async (req,res) => {
    const {bookingID, startTime, duration, numPeople, userID, postalCode,address} = req.body;

    if (!bookingID || !startTime || !userID || !postalCode || !address) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const updateResult = await bookingService.addBooking(bookingID, startTime, duration, numPeople, userID, postalCode,address)
    if (updateResult) {
        res.json({success: true});
    } else {
        res.status(500).json({success: false, message: 'failed to add booking'});
    }
})


router.delete('/:bookingID', async (req,res) => {
    const {bookingID} = req.params;
    const updateResult = await bookingService.deleteBooking(bookingID);
    if (updateResult) {
        res.json({success: true});
    } else {
        res.status(500).json({success: false, message: 'failed to delete booking'});
    }
})

router.get('/:bookingID', async (req,res )=> {
    const {bookingID} = req.params;
    const getResult = await bookingService.getBookingFromKey(bookingID);
    if (getResult.length > 0) {
        res.json({ data: getResult});
    } else {
        res.status(404).json({success: false, message: 'failed to get booking'});
    }
})



module.exports = router;