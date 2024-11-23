const express = require('express');
const bookableService = require('../appServices/bookableService');
const router = express.Router();

// get all bookables
router.get('/', async (req, res) => {
    const tableContent = await bookableService.getBookables();
    res.json({data: tableContent});
});

// add a bookable item
router.post('/add-bookable', async (req, res) => {
    const {postalCode, address, price} = req.body;
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
    const updateResult = bookableService.getBookableFromKey(postalCode, address);
    res.json({data: updateResult});
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
    res.json({data: tableContent});
});

// add a restaurant 
router.post('/restaurants/add-restaurant', async (req, res) => {
    const {postalCode, address, cuisineType} = req.body;
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
    const updateResult = bookableService.getRestaurantFromKey(postalCode, address);
    res.json({data: updateResult});
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
    res.json({data: tableContent});
});

// add a hotel 
router.post('/hotels/add-hotel', async (req, res) => {
    const {postalCode, address, stars} = req.body;
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
    const updateResult = bookableService.getHotelFromKey(postalCode, address);
    res.json({data: updateResult});
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