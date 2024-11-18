// queries for locations, parks and museums
const {withOracleDB } = require('../db');


// get all locations
async function getLocations() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from locations'
        );
        return result.rows;
    }).catch(() => {
        console.error('Error in getLocations:', err);
        return [];
    })
}



//add a location with its subtype??
async function addLocation(locationName, postalCode, address, operationHours, provinceState, cityName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO locations (locationName, postalCode, address, operationHours, provinceState, cityName)
             VALUES(:locationName, :postalCode, :address, :operationHours, :provinceState, :cityName)`,
             [locationName, postalCode, address, operationHours, provinceState, cityName],
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
    }).catch(() => {
        console.error('Error in getLocationFromKey:', err);
        return [];
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
    }).catch(() => {
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
    }).catch(() => {
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
    }).catch(()=> {
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
    }).catch(() => {
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
    }).catch(() => {
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
    }).catch(() => {
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
    getLocationFromKey,
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
