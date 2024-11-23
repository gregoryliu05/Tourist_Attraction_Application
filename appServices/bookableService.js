// queries for bookable, restaurant and hotel
const {withOracleDB } = require('../db');



// get all bookables
async function getBookables() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from bookable' 
        );
        return result.rows;
    }).catch(() => {
        console.error('Error in getLocations:', err);
        return [];
    })
}

// add a bookable item
async function addBookable(postalCode, address, price) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO bookable (postalCode, address, price)
            VALUES (:postalCode, :address, :price)`,
            [postalCode, address, price],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// delete a bookable item
async function deleteBookable(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM bookable WHERE postalCode = :postalCode AND address = :address`,
            [postalCode, address]
        );
        return result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// get a bookable item by postalCode and address
async function getBookableFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM bookable WHERE postalCode = :postalCode AND address = :address`,
            [postalCode, address]
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getBookableFromKey:', err);
        return [];
    });
}
// add a restaurant
async function addRestaurant(postalCode, address, cuisineType) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO restaurant (postalCode, address, cuisineType)
            VALUES (:postalCode, :address, :cuisineType)`,
            [postalCode, address, cuisineType],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// delete a restaurant
async function deleteRestaurant(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM restaurant WHERE postalCode = :postalCode AND address = :address`,
            [postalCode, address]
        );
        return result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// get all restaurants
async function getAllRestaurants() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM restaurant`
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getAllRestaurants:', err);
        return [];
    });
}

// get a restaurant by postalCode and address
async function getRestaurantFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM restaurant WHERE postalCode = :postalCode AND address = :address`,
            [postalCode, address]
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getRestaurantFromKey:', err);
        return [];
    });
}


// Add a hotel
async function addHotel(postalCode, address, price, stars) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO hotel (postalCode, address, price, stars)
            VALUES (:postalCode, :address, :price, :stars)`,
            [postalCode, address, price, stars],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// Delete a hotel
async function deleteHotel(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM hotel WHERE postalCode = :postalCode AND address = :address`,
            [postalCode, address]
        );
        return result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// Get all hotels
async function getAllHotels() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM hotel`
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getAllHotels:', err);
        return [];
    });
}

// Get a hotel by postalCode and address
async function getHotelFromKey(postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM hotel WHERE postalCode = :postalCode AND address = :address`,
            [postalCode, address]
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error in getHotelFromKey:', err);
        return [];
    });
}


module.exports = {
     // Restaurants
     addRestaurant,
     deleteRestaurant,
     getAllRestaurants,
     getRestaurantFromKey,
 
     // Hotels
     addHotel,
     deleteHotel,
     getAllHotels,
     getHotelFromKey,

    addBookable,
    deleteBookable,
    getBookableFromKey,
    getBookables
}

