const {withOracleDB } = require('../db');

async function addEventDetails(eventName, startTime, duration, host, postalCode, address) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO event_details (eventName, startTime, duration, host, postalCode, address)
            VALUES (:eventName, :startTime, :duration, :host, :postalCode, :address)`,
            {
                eventName: eventName,
                startTime: startTime,
                duration: duration,
                host: host,
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

async function getEventDetailsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * from event_details'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getEventDetails(eventName, startTime, duration) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from event_details WHERE eventName = :eventName AND startTime = :startTime AND duration = :duration`,
            [eventName, startTime, duration]
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//delete a rating by user for a location
async function deleteEventDetails(eventName, startTime, duration) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM event_details WHERE eventName = :eventName AND startTime = :startTime AND duration = :duration`,
            [eventName, startTime, duration]
        );
        return true;
    }).catch(() => {
        return false;
    });
}

module.exports = {
    addEventDetails, 
    getEventDetailsFromDb,
    getEventDetails,
    deleteEventDetails,
};