const express = require('express');
const bookableService = require('../appServices/bookableService');
const router = express.Router();

// get all bookables
router.get('/', async (req, res) => {
    const tableContent = await bookableService.getBookables();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all bookables'});
    }
});

// add a bookable item
router.post('/add-bookable', async (req, res) => {
    const {postalCode, address, price} = req.body;


    if (!postalCode || !address || !price) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = bookableService.addBookable(postalCode, address, price);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});


// get a bookable item
router.get('/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    const tableContent = bookableService.getBookableFromKey(postalCode, address);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get bookable'});
    }
});


// delete a bookable item
router.delete('/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    const updateResult = bookableService.deleteBookable(postalCode, address);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }

})

// get all restaurants
router.get('/restaurants', async (req, res) => {
    const tableContent = await bookableService.getAllRestaurants();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all restaurants'});
    }
});

// add a restaurant 
router.post('/restaurants/add-restaurant', async (req, res) => {
    const {postalCode, address, cuisineType} = req.body;

    if (!postalCode || !address || !cuisineType) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = bookableService.addRestaurant(postalCode, address, cuisineType);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});


// get a restaurant
router.get('/restaurants/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    const tableContent = bookableService.getRestaurantFromKey(postalCode, address);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get restaurant'});
    }
});


// delete a restaurant 
router.delete('/restaurants/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    const updateResult = bookableService.deleteRestaurant(postalCode, address);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }

})


//get all hotels
router.get('/hotels', async (req, res) => {
    const tableContent = await bookableService.getAllHotels();
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get all hotels'});
    }
});

// add a hotel 
router.post('/hotels/add-hotel', async (req, res) => {
    const {postalCode, address, stars} = req.body;

    if (!postalCode || !address || !stars) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const insertResult = bookableService.addHotel(postalCode, address, stars);
    if (insertResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({success: false});
    }
});



// get a hotel
router.get('/hotels/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    const tableContent = bookableService.getHotelFromKey(postalCode, address);
    if (tableContent.length > 0) {
        res.json({data: tableContent});
    } else {
        res.status(404).json({success: false, message: 'failed to get hotel'});
    }
});


// delete a hotel 
router.delete('/hotels/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    const updateResult = bookableService.deleteHotel(postalCode, address);
    if (updateResult) {
        res.json({ success: true});
    } else {
        res.status(500).json({ success: false});
    }
})


module.exports = router;