// const oracledb = require('oracledb');
// const loadEnvFile = require('../utils/envUtil');

// const envVariables = loadEnvFile('../.env');

// // Database configuration setup. Ensure your .env file has the required database credentials.
// const dbConfig = {
//     user: envVariables.ORACLE_USER,
//     password: envVariables.ORACLE_PASS,
//     connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
//     poolMin: 1,
//     poolMax: 3,
//     poolIncrement: 1,
//     poolTimeout: 60
// };

// // initialize connection pool
// async function initializeConnectionPool() {
//     try {
//         await oracledb.createPool(dbConfig);
//         console.log('Connection pool started');
//     } catch (err) {
//         console.error('Initialization error: ' + err.message);
//     }
// }

// async function closePoolAndExit() {
//     console.log('\nTerminating');
//     try {
//         await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
//         console.log('Pool closed');
//         process.exit(0);
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// }

// initializeConnectionPool();

// process
//     .once('SIGTERM', closePoolAndExit)
//     .once('SIGINT', closePoolAndExit);


// // ----------------------------------------------------------
// // Wrapper to manage OracleDB actions, simplifying connection handling.
// async function withOracleDB(action) {
//     let connection;
//     try {
//         connection = await oracledb.getConnection(); // Gets a connection from the default pool 
//         return await action(connection);
//     } catch (err) {
//         console.error(err);
//         throw err;
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// }


// // ----------------------------------------------------------
// // Core functions for database operations
// // Modify these functions, especially the SQL queries, based on your project's requirements and design.
// async function testOracleConnection() {
//     return await withOracleDB(async (connection) => {
//         return true;
//     }).catch(() => {
//         return false;
//     });
// }

// async function fetchUsersFromDb() {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute('SELECT * FROM users');
//         return result.rows;
//     }).catch(() => {
//         return [];
//     });
// }

// async function initiateUsers() {
//     return await withOracleDB(async (connection) => {
//         try {
//             await connection.execute(`DROP TABLE users CASCADE CONSTRAINTS`);
//         } catch(err) {
//             console.log('Table might not exist, proceeding to create...');
//         }

//         const result = await connection.execute(`
//             CREATE TABLE users (
//             userID CHAR(10) NOT NULL,
//             fullName VARCHAR(50) NOT NULL,
//             username VARCHAR(25) NOT NULL,
//             password VARCHAR(25) NOT NULL,
//             numReviews INT,
//             email VARCHAR(50) UNIQUE,
//             PRIMARY KEY(userID)
//             )
//         `);
//         return true;
//     }).catch(() => {
//         return false;
//     });
// }

// async function insertUsers(userID, fullName, username, password, email) {
//     console.log("Insert Parameters:", { userID, fullName, username, password, email }); // Debug log
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             `INSERT INTO users (userID, fullName, username, password, numReviews, email) 
//             VALUES (:userID, :fullName, :username, :password, 0, :email)`,
//             {
//                 userID: userID,
//                 fullName: fullName,
//                 username: username,
//                 password: password,
//                 email: email
//             },
//             { autoCommit: true }
//         );

//         return result.rowsAffected && result.rowsAffected > 0;
//     }).catch(() => {
//         return false;
//     });
// }


// async function updateNameUsers(oldName, newName) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             `UPDATE users SET fullName=:newName where fullName=:oldName`,
//             [newName, oldName],
//             { autoCommit: true }
//         );

//         return result.rowsAffected && result.rowsAffected > 0;
//     }).catch(() => {
//         return false;
//     });
// }

// // probably not nteeded 
// async function countUsers() {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute('SELECT Count(*) FROM users');
//         return result.rows[0][0];
//     }).catch(() => {
//         return -1;
//     });
// }

// // get user by location 
// async function getUserByID(userID) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             'SELECT * from users where userID = :userID',
//             [userID]
//         );
//         return result.rows;
//     }).catch(() => {
//         return [];
//     });
// }

// // **RATING STARTS HERE **
// // add a rating by user for a location
// async function addRating(ratingID, score, userID, postalCode, address) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             `INSERT INTO rating (ratingID, score, userID, postalCode, address)
//             VALUES (:ratingID, :score, :userID, :postalCode, :address)`,
//             {
//                 ratingID: ratingID,
//                 score: score,
//                 userID: userID,
//                 postalCode: postalCode,
//                 address: address,
//             },
//             { autoCommit: true }
//         );
//         return result.rowsAffected && result.rowsAffected > 0;
//     }).catch(() => {
//         return false;
//     });
// }

// // get all ratings done by a user
// async function getRatingsFromDb() {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             'SELECT * from rating',
//         );
//         return result.rows;
//     }).catch(() => {
//         return [];
//     });
// }

// // get a rating by ratingID
// async function getRating(ratingID) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             `SELECT * from rating WHERE ratingID = :ratingID`,
//             [ratingID]
//         );
//         return result.rows;
//     }).catch(() => {
//         return [];
//     });
// }

// // delete a rating by user for a location
// async function deleteRating(ratingID) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             `DELETE FROM rating WHERE ratingID = :ratingID`,
//             [ratingID]
//         );
//         return true;
//     }).catch(() => {
//         return false;
//     });
// }

// // get all ratings done by a user
// async function getUsersRating(userID) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             'SELECT * from rating where userID = :userID',
//             [userID]
//         );
//         return result.rows;
//     }).catch(() => {
//         return [];
//     });
// }

// // get all ratings for a location 
// // CHANGE THIS ONE ITS INCORRECT
// async function getLocationsRating(locationID) {
//     return await withOracleDB(async (connection) => {
//         const result = await connection.execute(
//             `SELECT * from rating where locationID = :locationID`,
//             [locationID]
//         );
//         return result.rows
//     }).catch(()=> {
//         return [];
//     });
// }

// module.exports = {
//     ...exports
// };