const express = require('express');
const cors = require('cors')
const userController = require('./appControllers/userController');
const ratingController = require('./appControllers/ratingController');
const locationController = require('./appControllers/locationController');
const bookableController = require('./appControllers/bookableController');
const bookingController = require('./appControllers/bookingController');
const userCommentController = require('./appControllers/userCommentController');
const pictureController = require('./appControllers/pictureController');
const categorizesController = require('./appControllers/categorizesController');
const categoryController = require('./appControllers/categoryController');
const cityDetailsController = require('./appControllers/cityDetailsController');
const cityTimeZoneController = require('./appControllers/cityTimeZoneController');
const eventDetailsController = require('./appControllers/eventDetailsController');

// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};
app.use(cors(corsOptions));


// If you prefer some other file as default page other than 'index.html',
//      you can adjust and use the bellow line of code to
//      route to send 'DEFAULT_FILE_NAME.html' as default for root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/DEFAULT_FILE_NAME.html');
// });


// mount the router
app.use('/users', userController);
app.use('/ratings', ratingController);
app.use('/locations', locationController);
app.use('/bookables', bookableController);
app.use('/bookings', bookingController);
app.use('/userComments', userCommentController);
app.use('/pictures', pictureController);
app.use('/categorizes',categorizesController);
app.use('/categories', categoryController); 
app.use('/cityDetails', cityDetailsController); 
app.use('/cityTimeZones', cityTimeZoneController);
app.use('/eventDetails', eventDetailsController); 




// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

