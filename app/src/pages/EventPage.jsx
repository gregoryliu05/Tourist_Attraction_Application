import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const EventPage = () => {
    const params = useParams(); // Extract the event name from the route
    const [event, setEvent] = useState(null); // Event data
    const [selectedFields, setSelectedFields] = useState([]); // Selected fields
    const [loading, setLoading] = useState(false); // Loading state

    // Available fields for projection
    const availableFields = ['eventName', 'startTime', 'duration', 'host', 'postalCode', 'address'];

    // Debugging: Log the available fields
    console.log('Available fields for projection:', availableFields);

    // Handle field selection
    const handleFieldChange = (field) => {
        setSelectedFields((prev) =>
            prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
        );
    };

    // Debugging: Log the selected fields
    useEffect(() => {
        console.log('Selected fields:', selectedFields);
    }, [selectedFields]);

    // Fetch data with selected fields
    const fetchEventDetails = async () => {
        if (selectedFields.length === 0) {
            console.log('No fields selected. Skipping API call.');
            return;
        }

        setLoading(true); // Set loading state
        const fieldsQuery = selectedFields.join(',');
        const requestUrl = `http://localhost:50004/eventDetails/${params.eventName}?fields=${fieldsQuery}`;

        // Debugging: Log the request URL
        console.log('Request URL:', requestUrl);

        try {
            const response = await axios.get(requestUrl);

            // Debugging: Log the raw API response
            console.log('API response:', response.data);

            setEvent(response.data.data[0]); // Assume response contains an array

            // Debugging: Log the event data after setting state
            console.log('Event data:', response.data.data[0]);
        } catch (error) {
            console.error('Error fetching event details:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Fetch data when selectedFields changes
    useEffect(() => {
        fetchEventDetails();
    }, [selectedFields]);

    return (
        <div className="flex gap-6 px-6 py-4">
            {/* Field Selection */}
            <div className="w-1/3">
                <h3 className="text-lg font-bold mb-4">Select Fields to View:</h3>
                <div className="space-y-2">
                    {availableFields.map((field) => (
                        <div key={field} className="flex items-center">
                            <input
                                type="checkbox"
                                id={field}
                                checked={selectedFields.includes(field)}
                                onChange={() => handleFieldChange(field)}
                                className="mr-2"
                            />
                            <label htmlFor={field} className="text-gray-700">
                                {field}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Event Details */}
            <div className="w-2/3">
                {loading ? (
                    <div className="w-full h-[200px] bg-gray-100 border border-gray-200 shadow-lg rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Loading event details...</p>
                    </div>
                ) : event ? (
                    <div className="w-full h-auto bg-white border border-gray-200 shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{event.eventName || 'Event Details'}</h2>
                        <div className="text-gray-700 space-y-2">
                            {Object.entries(event).map(([key, value]) => (
                                <p key={key}>
                                    <span className="font-bold">{key}:</span> {value}
                                </p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-[200px] bg-gray-100 border border-gray-200 shadow-lg rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Select fields to view event details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventPage;
