// queries for locations, parks and museums
const { connect } = require('../appControllers/userController');
const {withOracleDB } = require('../db');


// get all locations
async function getLocations() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from locations'
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getLocations:', err);
        return [];
    })
}


// get all locations name, address and postal code
async function getLocationsDetails() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT locationID, locationName, address, postalCode from locations'
        );
        const locations = result.rows.map((row) => ({
            locationID: row[0],
            locationName: row[1],
            postalCode: row[2],
            address: row[3]    
        })
    )
        return locations;
    }).catch((err) => {
        console.error("Error in getLocationsDetails:", err);
        return null;
    })
}


//add a location with its subtype??
async function addLocation(locationID, locationName, postalCode, address, operationHours, provinceState, cityName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO locations (locationID, locationName, postalCode, address, operationHours, provinceState, cityName)
             VALUES(:locationID, :locationName, :postalCode, :address, :operationHours, :provinceState, :cityName)`,
             [locationID, locationName, postalCode, address, operationHours, provinceState, cityName],
             {autoCommit: true}
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    })
}




//get a location from postalCode and Address
async function getLocationFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT * from locations WHERE postalCode = :postalCode and address = :address`,
            [postalCode, address]
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getLocationFromKey:', err);
        return [];
    })
}


//get a location from locationID
async function getLocationFromID(locationID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT * from locations WHERE locationID = :locationID`,
            [locationID]
        );
        if (result.rows.length === 0) {
            return null; 
        }
    
        return {
            locationID: result.rows[0][0],
            locationName: result.rows[0][1],
            postalCode: result.rows[0][2],
            address: result.rows[0][3],
            operationHours: result.rows[0][4],
            provinceState: result.rows[0][5],
            cityName: result.rows[0][6],
        };
    }).catch((err) => {
        console.error('Error in getLocationFromKey:', err);
        return null;
    })
}

async function deleteLocationFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            DELETE FROM locations WHERE postalCode = :postalCode and address = :address`,
            [postalCode, address]
        );
        return result.rowsAffected > 0; 
    }).catch(() => {
        return false;
    });
}

//get a location based off name 
async function getLocationsWithName(locationName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT * from locations WHERE locationName = :locationName`,
        [locationName]
    );
    return result.rows;
    }).catch((err) => {
        console.error('Error in getLocationsWithName:', err);
        return [];
    })
}

//get locations in a city
async function getLocationsInCity(cityName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT * from locations WHERE cityName = :cityName`,
        [cityName]
    );
    return result.rows;
    }).catch((err) => {
        console.error('Error in getLocationsInCity:', err);
        return [];
    })
}



// get all ratings for a location 
async function getLocationsRating(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from rating where postalCode = :postalCode AND address = :address`,
            [postalCode, address],
        );
        return result.rows
    }).catch((err)=> {
        console.error('Error in getLocationsRating:', err);
        return [];
    });
}

// add a park
async function addPark(postalCode, address, area) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO parks (postalCode, address, area)
            VALUES (:postalCode, :address, :area)`,
            [postalCode, address, area],
            {autoCommit: true}
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    })
}


// delete a park
async function deletePark(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM parks WHERE postalCode = :postalCode and address = :address`,
            [postalCode, address]
        );
        return result.rowsAffected > 0; 
    }).catch(() => {
        return false;
    });
}

// get all parks
async function getAllParks() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from parks`
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getAllParks:', err);
        return [];
    })
}

// get a single park based on postalCode and Address
async function getParkFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from parks WHERE postalCode = :postalCode and address = :address`,
            [postalCode, address]
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getParkFromKey:', err);
        return [];
    })
}


// add a museum
async function addMuseum(postalCode, address, cost) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO museums (postalCode, address, cost)
            VALUES (:postalCode, :address, :cost)`,
            [postalCode, address, cost],
            {autoCommit: true}
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    })
    
}

// delete a park
async function deleteMuseum(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM museums WHERE postalCode = :postalCode and address = :address`,
            [postalCode, address]
        );
        return result.rowsAffected > 0; 
    }).catch(() => {
        return false;
    });
}

// get all parks
async function getAllMuseums() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from museums`
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getAllMuseums:', err);
        return [];
    })
}

// get a single park based on postalCode and Address
async function getMuseumFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from museums WHERE postalCode = :postalCode and address = :address`,
            [postalCode, address]
        );
        return result.rows;
    }).catch(() => {
        console.error('Error in getMuseum:', err);
        return [];
    })
}




module.exports = {
    getLocations,
    addLocation,
    getLocationFromID,
    getLocationFromKey,
    getLocationsDetails,
    deleteLocationFromKey,
    getLocationsWithName,
    getLocationsInCity,
    getLocationsRating,
    addPark, 
    deletePark,
    getAllParks,
    getParkFromKey,
    addMuseum,
    deleteMuseum,
    getAllMuseums,
    getMuseumFromKey
}
