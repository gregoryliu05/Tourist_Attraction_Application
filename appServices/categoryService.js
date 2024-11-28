const {withOracleDB } = require('../db');

// get all userComment done by a user
async function getCategoryFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from category'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// get a rating by ratingID
async function getCategory(catName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from category WHERE catName = :catName`,
            [catName]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    getCategoryFromDb,
    getCategory,
};