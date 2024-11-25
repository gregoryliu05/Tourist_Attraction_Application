const {withOracleDB } = require('../db');

// test db connection
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}


// get all users 
async function fetchUsersFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM users');
        return result.rows;
    }).catch(() => {
        return [];
    });
}


// reset users table 
async function initiateUsers() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE users CASCADE CONSTRAINTS`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE users (
            userID CHAR(10) NOT NULL,
            fullName VARCHAR(50) NOT NULL,
            username VARCHAR(25) NOT NULL,
            password VARCHAR(25) NOT NULL,
            numReviews INT,
            email VARCHAR(50) UNIQUE,
            PRIMARY KEY(userID)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}


// add user 
async function insertUsers(userID, fullName, username, password, numReviews, email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO users (userID, fullName, username, password, numReviews, email) 
            VALUES (:userID, :fullName, :username, :password, :numReviews , :email)`,
            {
                userID: userID,
                fullName: fullName,
                username: username,
                password: password,
                numReviews: numReviews,
                email: email
            },
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// update user's name
async function updateNameUsers(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE users SET fullName=:newName where fullName=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

// probably not nteeded 
async function countUsers() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM users');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

// get user by ID
async function getUserByID(userID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from users where userID = :userID',
            [userID]
        );
        const data = result.rows[0];
        if (result.rows.length > 0 ) {
            return {
                userID: data[0],
                fullName: data[1],
                username: data[2],
                password: data[3],
                numReviews: data[4],
                email: data[5]
            }
        }
        return null;
    }).catch((err) => {
        console.err("could not get user", err);
        return null;
    });
}


// getting bookings based on userID
async function getUsersBookings(userID) {
    return await withOracleDB(async (connection)=> {
        const result = await connection.execute(
            `SELECT * from booking_details where userID = :userID`,
            [userID]
        )
        return result.rows;
    }).catch((err)=> {
        console.err("could not get bookings", err);
    })
} 

// update users Password
async function updateUserPassword(userID, newPassword) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE users set password = :newPassword WHERE userID = :userID`,
            [newPassword, userID],
            {autoCommit: true}
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error in updateUserPassword:', err);
        return false;
    });
}

// get user login details 
async function getUserFromUsernameAndPassword(username, password) {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `SELECT * FROM users WHERE username = :username AND password = :password`,
                [username, password]
            );

            if (result.rows.length > 0) {
                const user = result.rows[0]; 
                return {
                    userID: user[0], 
                    fullName: user[1], 
                    username: user[2], 
                    password: user[3], 
                    numReviews: user[4], 
                    email: user[5] 
                };
            }
            return null; 
        });
    } catch (err) {
        console.error('Error during database query:', err);
        throw new Error('Database error'); 
    }
}

module.exports = {
    testOracleConnection,
    fetchUsersFromDb,
    initiateUsers,
    insertUsers,
    updateNameUsers,
    countUsers,
    getUserByID,
    getUsersBookings, 
    updateUserPassword,
    getUserFromUsernameAndPassword
};