import { useState, useEffect } from 'react';
import axios from '../api/axios';

const BookingComponent = (props) => {
  const { bookingID, startTime, duration, numPeople, userID, postalCode, address } = props;
  const [location, setLocation] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:50004/locations/${postalCode}/${address}`)
      .then((response) => {
        setLocation(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }, [postalCode, address]);

  return (
    <>
      {location ? (
        <div className="bg-gray-100 py-4 px-4 rounded-lg border border-gray-300 shadow-md">
          <p>
            <span className="font-bold">{location.locationName}</span>
          </p>
          <p>
            <span className="font-bold">Booking ID:</span> {bookingID}
          </p>
          <p>
            <span className="font-bold">Start Time:</span> {startTime}
          </p>
          <p>
            <span className="font-bold">Duration:</span> {duration} hours
          </p>
          <p>
            <span className="font-bold">Number of People:</span> {numPeople}
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BookingComponent;
