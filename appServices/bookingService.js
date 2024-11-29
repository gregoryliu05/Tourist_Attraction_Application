const {withOracleDB} = require('../db');



// get all Bookings
async function getAllBookings() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from booking_details`
        );
        return result.rows;
    }).catch((err) => {
        console.error('error in getAllBookings', err);
        return [];
    })
}



// add a Booking
async function addBooking(bookingID, startTime, duration, numPeople, userID, postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO booking_details (bookingID, startTime, duration, numPeople, userID, postalCode, address)
            VALUES (:bookingID, :startTime, :duration, :numPeople, :userID, :postalCode, :address )`,
            [bookingID, startTime, duration, numPeople, userID, postalCode, address],
            { autoCommit: true}
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error in addBooking:', err);
        return false;
    });
}


// delete a booking
async function deleteBooking(bookingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM booking_details WHERE bookingID = :bookingID`,
            [bookingID]
        );
        return result.rowsAffected && result.rowsAffected >0;
    }).catch(() => {
        return false;
    });
}

// get a booking by the key
async function getBookingFromKey(bookingID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from booking_details WHERE bookingID = :bookingID`,
            [bookingID]
        );
        return result.rows;
    }).catch((err) => {
        console.error('could not get booking', err);
        return [];
    })
}

module.exports = {
    getAllBookings,
    addBooking,
    deleteBooking,
    getBookingFromKey
}