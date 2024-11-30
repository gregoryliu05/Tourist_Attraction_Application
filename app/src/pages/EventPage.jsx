import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const EventPage = () => {
    const params = useParams(); 
    const [event, setEvent] = useState(null); 
    const [selectedFields, setSelectedFields] = useState([]); 
    const [loading, setLoading] = useState(false); 

   
    const availableFields = ['eventName', 'startTime', 'duration', 'host', 'postalCode', 'address'];


    const handleFieldChange = (field) => {
        setSelectedFields((prev) =>
            prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
        );
    };

    
    useEffect(() => {
        console.log('Selected fields:', selectedFields);
    }, [selectedFields]);

   
    const fetchEventDetails = async () => {
        if (selectedFields.length === 0) {
            console.log('No fields selected. Skipping API call.');
            return;
        }

        setLoading(true);
        const fieldsQuery = selectedFields.join(',');
        const requestUrl = `http://localhost:50004/eventDetails/events/${params.eventName}?fields=${fieldsQuery}`;

       

        try {
            const response = await axios.get(requestUrl);

           

            setEvent(response.data.data[0]); 

            
        } catch (error) {
            console.error('Error fetching event details:', error);
        } finally {
            setLoading(false); 
        }
    };

    // Fetch data when selectedFields changes
    useEffect(() => {
        fetchEventDetails();
    }, [selectedFields]);

    return (
        <div className="flex gap-6 px-6 py-4">
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
