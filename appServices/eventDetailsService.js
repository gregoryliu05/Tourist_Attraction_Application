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
        const details = result.rows.map((row) => ({
            eventName: row[0],
            startTime: row[1],
            duration : row[2],
            host: row[3],
            postalCode: row[4],
            address: row[5]

        }))
        return details
    }).catch(() => {
        return [];
    });
}

async function getEventSearchAll(eventName, host, postalCode) {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(
                `SELECT * from event_details WHERE eventName = :eventName AND host = :host AND postalCode = :postalCode`,
                [eventName, host, postalCode]
            );
            const details = result.rows.map((row) => ({
                eventName: row[0],
                startTime: row[1],
                duration: row[2],
                host: row[3],
                postalCode: row[4],
                address: row[5]
            }));

            return details;

        } catch (error) {
            console.error("Error executing query:", error); 
            throw error;
        }
    }).catch((error) => {
        console.error("Database error:", error); 
        return [];
    });
}


async function getEventDetails(eventName, startTime, duration) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * from event_details WHERE eventName = :eventName AND startTime = :startTime AND duration = :duration`,
            [eventName, startTime, duration]
        );
        const details = result.rows.map((row) => ({
            eventName: row[0],
            startTime: row[1],
            duration : row[2],
            host: row[3],
            postalCode: row[4],
            address: row[5]

        }))
        return details;
    }).catch(() => {
        return [];
    });
}

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

async function getEventSearchNameHost(eventName, host) {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(
                `SELECT * from event_details WHERE eventName = :eventName AND host = :host`,
                [eventName, host]
            );
            const details = result.rows.map((row) => ({
                eventName: row[0],
                startTime: row[1],
                duration: row[2],
                host: row[3],
                postalCode: row[4],
                address: row[5]
            }));

            return details;

        } catch (error) {
            console.error("Error executing query:", error); 
            throw error;
        }
    }).catch((error) => {
        console.error("Database error:", error); 
        return [];
    });
}

async function getEventSearchNamePostalCode(eventName, postalCode) {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(
                `SELECT * from event_details WHERE eventName = :eventName AND postalCode = :postalCode`,
                [eventName, postalCode]
            );
            const details = result.rows.map((row) => ({
                eventName: row[0],
                startTime: row[1],
                duration: row[2],
                host: row[3],
                postalCode: row[4],
                address: row[5]
            }));

            return details;

        } catch (error) {
            console.error("Error executing query:", error); 
            throw error;
        }
    }).catch((error) => {
        console.error("Database error:", error); 
        return [];
    });
}



async function getEventSearchName(eventName) {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(
                `SELECT * from event_details WHERE eventName = :eventName`,
                [eventName]
            );
            const details = result.rows.map((row) => ({
                eventName: row[0],
                startTime: row[1],
                duration: row[2],
                host: row[3],
                postalCode: row[4],
                address: row[5]
            }));

            return details;

        } catch (error) {
            console.error("Error executing query:", error); 
            throw error;
        }
    }).catch((error) => {
        console.error("Database error:", error); 
        return [];
    });
}

async function getEventDetailsWithProjection(eventName, fields) {
    return await withOracleDB(async (connection) => {
        try {
            const validFields = ['eventName', 'startTime', 'duration', 'host', 'postalCode', 'address'];
            
            // Filter requested fields against valid fields
            const selectedFields = fields.filter(field => validFields.includes(field)).join(', ') || '*';

            console.log('Requested fields:', fields);
            console.log('Validated fields for query:', selectedFields);

            if (selectedFields === '*') {
                console.warn('No valid fields selected. Querying all fields.');
            }

            // Construct the SQL query
            const query = `SELECT ${selectedFields} FROM event_details WHERE LOWER(TRIM(eventName)) = LOWER(:eventName)`;
            console.log('Constructed SQL Query:', query);

            // Execute the query
            const result = await connection.execute(query, [eventName.trim()]);
            console.log('Raw Query Result:', result.rows);

            // Map the results to an object
            const details = result.rows.map((row) => {
                const mappedData = {};
                result.metaData.forEach((meta, index) => {
                    mappedData[meta.name.toLowerCase()] = row[index];
                });
                return mappedData;
            });

            console.log('Processed Event Details:', details);
            return details;

        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    });
}





module.exports = {
    addEventDetails, 
    getEventDetailsFromDb,
    getEventSearchAll,
    getEventDetails,
    deleteEventDetails,
    getEventSearchName,
    getEventSearchNameHost,
    getEventSearchNamePostalCode,
    getEventDetailsWithProjection
};