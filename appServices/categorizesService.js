const {withOracleDB } = require('../db');

async function addCategorizes(catName, postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO categorizes (catName, postalCode, address)
            VALUES (:catName, :postalCode, :address)`,
            {
                catName: catName,
                postalCode: postalCode,
                address: address,
            },
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function getCategorizesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from categorizes'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getCategorizes(catName, postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from categorizes WHERE catName = :catName AND postalCode = :postalCode AND address = :address`,
            [catName, postalCode, address]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//delete a rating by user for a location
async function deleteCategorizes(catName, postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM categorizes WHERE catName = :catName AND postalCode = :postalCode AND address = :address`,
            [catName, postalCode, address]
        );
        return true;
    }).catch(() => {
        return false;
    });
}

module.exports = {
    addCategorizes, 
    getCategorizesFromDb,
    getCategorizes,
    deleteCategorizes,
};