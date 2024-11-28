const {withOracleDB } = require('../db');

// get all userComment done by a user
async function getCityDetailsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from city_details'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// get a rating by ratingID
async function getCityDetails(provinceState, cityName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from city_details WHERE provinceState = :provinceState AND cityName = :cityName`,
            [provinceState, cityName]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    getCityDetailsFromDb,
    getCityDetails,
};