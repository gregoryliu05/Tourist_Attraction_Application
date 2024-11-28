const {withOracleDB } = require('../db');

// get all userComment done by a user
async function getCityTimeZoneFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from city_time_zone'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// get a rating by ratingID
async function getCityTimeZone(provinceState, country) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from category WHERE provinceState = :provinceState AND country = :country`,
            [provinceState, country]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    getCityTimeZoneFromDb,
    getCityTimeZone,
};