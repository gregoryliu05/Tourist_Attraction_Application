const { autoCommit } = require('oracledb');
const {withOracleDB } = require('../db');

async function addUserComment(ratingID, text) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO user_comments (ratingID, text)
            VALUES (:ratingID, :text)`,
            {
                ratingID: ratingID,
                text: text,
            },
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// get all userComment done by a user
async function getUserCommentFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from user_comments'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// get a rating by ratingID
async function getUserComment(ratingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from user_comments WHERE ratingID = :ratingID`,
            [ratingID]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// delete a rating by user for a location
async function deleteUserComment(ratingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM user_comments WHERE ratingID = :ratingID`,
            [ratingID], 
            {
                autoCommit: true
            }
        );
        return result.rowsAffected > 0;
    }).catch((err) => {
        console.error("Error in deleteUserComment:", err);
        return false;
    });
}

module.exports = {
    addUserComment, 
    getUserCommentFromDb,
    getUserComment,
    deleteUserComment,
};