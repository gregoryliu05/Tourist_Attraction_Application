const {withOracleDB } = require('../db');

async function addPicture(ratingID, image) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO picture (ratingID, image)
            VALUES (:ratingID, :image)`,
            {
                ratingID: ratingID,
                image: image,
            },
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// get all userComment done by a user
async function getPictureFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from image'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// get a rating by ratingID
async function getPicture(ratingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from picture WHERE ratingID = :ratingID`,
            [ratingID]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//delete a rating by user for a location
async function deletePicture(ratingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM picture WHERE ratingID = :ratingID`,
            [ratingID]
        );
        return true;
    }).catch(() => {
        return false;
    });
}

module.exports = {
    addPicture, 
    getPictureFromDb,
    getPicture,
    deletePicture,
};