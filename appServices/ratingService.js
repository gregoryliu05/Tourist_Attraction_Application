const {withOracleDB } = require('../db');


// add a rating by user for a location
async function addRating(ratingID, score, userID, postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO rating (ratingID, score, userID, postalCode, address)
            VALUES (:ratingID, :score, :userID, :postalCode, :address)`,
            {
                ratingID: ratingID,
                score: score,
                userID: userID,
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

// get average rating and number of ratings for all locations 
async function getLocationsRatings() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT postalCode, address, AVG(score) as avg_rating, COUNT(*) as num_ratings
            from rating
            GROUP BY postalCode, address`
        );
        const ratings = result.rows.map((row)=> ({
            postalCode: row[0],
            address: row[1],
            avg_rating: row[2],
            num_ratings: row[3]
        }))
        return ratings;
    }).catch((err) => {
        console.log("error in getLocationsRatings", err)
        return null;
    })

}

async function getLocationsRatingsGood() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT postalCode, address, AVG(score) as avg_rating, COUNT(*) as num_ratings  
            from rating
            GROUP BY postalCode, address
            HAVING AVG(score) > (   
            SELECT AVG(score)    
            FROM rating
            )`
        );
        const ratings = result.rows.map((row)=> ({
            postalCode: row[0],
            address: row[1],
            avg_rating: row[2],
            num_ratings: row[3]
        }))
        return ratings;
    }).catch((err) => {
        console.log("error in getLocationsRatings", err)
        return null;
    })

}


// get all ratings done by a user
async function getRatingsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from rating'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// get a rating by ratingID
async function getRating(ratingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from rating WHERE ratingID = :ratingID`,
            [ratingID]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// delete a rating by user for a location
async function deleteRating(ratingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM rating WHERE ratingID = :ratingID`,
            [ratingID]
        );
        return true;
    }).catch(() => {
        return false;
    });
}

// get all ratings done by a user
async function getUsersRating(userID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from rating where userID = :userID',
            [userID]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}


module.exports = {
    addRating, 
    getRatingsFromDb,
    getRating,
    deleteRating,
    getUsersRating,
    getLocationsRatings,
    getLocationsRatingsGood
};