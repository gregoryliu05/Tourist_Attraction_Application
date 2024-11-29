import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { v4 as uuidv4 } from 'uuid';
import useUpdate from '../hooks/useUpdate';


const BookingComponent = (props) => {
  const { bookingID, startTime, duration, numPeople, userID, postalCode, address } = props;
  const [location, setLocation] = useState('');
  const {update, setUpdate} = useUpdate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {

      await axios.delete(`http://localhost:50004/bookings/${bookingID}`)
      
        console.log("Booking deleted Successfully")

      setUpdate(uuidv4().replace(/-/g, '').slice(0, 10))

    } catch (error) {
      console.error("Error deleting Booking", error);
    }

  }


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
          <button
            className='bg-red-500 text-white px-2 py-2 border rounded-lg hover:bg-red-600 transition-shadow'
            onClick = {handleClick}>
                Delete Booking
            </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BookingComponent;
