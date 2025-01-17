const express = require('express');
const locationService = require('../appServices/locationService');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const tableContent = await locationService.getLocations();
        res.json({ data: tableContent });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})

router.get('/categories/:catNames', async (req, res) => {
    const catNamesString = decodeURIComponent(req.params.catNames);

    try {
        const tableContent = await locationService.getLocationWithCategories(catNamesString);
        res.json({ data: tableContent });
    } catch (error) {
        console.error("Error in fetching categories:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/details', async (req,res) => {
    try {
        const tableContent = await locationService.getLocationsDetails();
        res.json({data: tableContent});
    } catch (err) {
        res.status(500).json({error: 'An error occured while fetching location'});
    }
})


router.post('/add-location', async (req, res) => {
    const {locationID, locationName, postalCode, address, operationHours, provinceState, cityName, locationType} = req.body;
    if (!postalCode || !address || !provinceState || !cityName || !locationName) {
        res.status(500).json({error: "Incomplete Data. Please fill out all required fields"});

    }
    const updateResult = await locationService.addLocation(locationID, locationName, postalCode, address, 
        operationHours, provinceState, cityName, locationType);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})


// gets ratings based on location
router.get('/:postalCode/:address/ratings', async (req, res) => {
    const {postalCode, address} = req.params;
    try {
        const viewResult = await locationService.getLocationsRating(postalCode, address);
        res.json({data :viewResult});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})



router.get('/:postalCode/:address', async (req, res) => {
    const {postalCode, address} = req.params;
    try {
        const viewResult = await locationService.getLocationFromKey(postalCode, address);
        res.json({data: viewResult});
    } catch (error) {
        res.status(500).json({error: 'An error occured while fetching location'});
    }
})


router.delete('/:postalCode/:address', async (req,res) => {
    const {postalCode, address} = req.params;
    const updateResult = await locationService.deleteLocationFromKey(postalCode, address);
    if (updateResult) {
        res.json({success: true})
    } else {
        res.status(500).json({success: false});
    }
})



router.get('/:locationID', async (req,res) => {
    const {locationID} = req.params;
    try {
        const tableContent = await locationService.getLocationFromID(locationID)
        res.json({data:tableContent})
    } catch (err) {
        res.status(500).json({error: 'An error occured while fetching location'});
    }

})


router.get('/:locationName', async (req,res) => {
    const {locationName} = req.params;
    try {
        const viewResult = await locationService.getLocationsWithName(locationName);
        res.json({data: viewResult});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})



router.get('/:cityName', async (req,res) => {
    const {cityName} = req.params;
    const viewResult = locationService.getLocationsWithName(cityName);
    res.json({data: viewResult});
})




router.post('/parks/add-park', async (req, res) => {
    const { postalCode, address, area} = req.body;
    if (!postalCode || !address || !area) {
        res.status(500).json({error: "Incomplete Data. Please fill out all required fields"});

    }
    const updateResult = await locationService.addPark(postalCode, address, area);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})


router.delete('/parks/:postalCode/:address', async (req,res) => {
    const {postalCode, address} = req.params;
    const updateResult = await locationService.deletePark(postalCode, address);
    if (updateResult) {
        res.json({success: true})
    } else {
        res.status(500).json({success: false});
    }
})

router.get('/parks', async (req,res) => {
    try {
        const tableContent = await locationService.getAllParks();
        res.json({ data: tableContent });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})

router.get('/parks/:postalCode/:address', async (req,res) => {
    const {postalCode, address} = req.params;
    try {
        const viewResult = await locationService.getParkFromKey(postalCode, address);

        res.json({data :viewResult});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})

router.get('/museums/:postalCode/:address', async (req,res) => {
    const {postalCode, address} = req.params;
    try {
        const viewResult = await locationService.getMuseumFromKey(postalCode, address);
        res.json({data :viewResult});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})



router.post('/museums/add-museum', async (req, res) => {
    const { postalCode, address, cost} = req.body;
    if (!postalCode || !address || !cost) {
        res.status(500).json({error: "Incomplete Data. Please fill out all required fields"});

    }
    const updateResult = await locationService.addMuseum(postalCode, address, cost);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})


router.delete('/museums/:postalCode/:address', async (req,res) => {
    const {postalCode, address} = req.params;
    const updateResult = await locationService.deleteMuseum(postalCode, address);
    if (updateResult) {
        res.json({success: true})
    } else {
        res.status(500).json({success: false});
    }
})

router.get('/museums', async (req,res) => {
    try {
        const tableContent = await locationService.getAllMuseums();
        res.json({ data: tableContent });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location' });
    }
})





module.exports = router;