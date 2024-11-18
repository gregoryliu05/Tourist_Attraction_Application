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
async function insertUsers(userID, fullName, username, password, email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO users (userID, fullName, username, password, numReviews, email) 
            VALUES (:userID, :fullName, :username, :password, 0, :email)`,
            {
                userID: userID,
                fullName: fullName,
                username: username,
                password: password,
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

// get user by location 
async function getUserByID(userID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from users where userID = :userID',
            [userID]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    testOracleConnection,
    fetchUsersFromDb,
    initiateUsers,
    insertUsers,
    updateNameUsers,
    countUsers,
    getUserByID
};