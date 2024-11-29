import {useRef, useState, useEffect} from 'react';
import { NavLink, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from '../api/axios';
import TopNavBar from '../components/TopNavBar';
import useAuth from '../hooks/useAuth';
import useUpdate from '../hooks/useUpdate';

const LocationElement = (props) => {
  const {location, rating} = props;

  return (
    <div className="flex justify-center items-center bg-white-100 w-96 h-32 p-4">
      <div className="max-w-lg w-full border border-gray-300 rounded-lg shadow-sm p-6 bg-white">
        <h2 className="text-xl font-bold text-gray-800">{location.locationName}</h2>
        <p className="text-sm text-gray-500">
          Address: {location.address}, {location.postalCode}
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-bold">Rating:</span>
          <h1
            className={
              rating.avg_rating >= 4
                ? "text-green-500"
                : rating.avg_rating >= 2.5
                ? "text-yellow-500"
                : "text-red-300"
            }
          >
            {Math.round((rating.avg_rating + Number.EPSILON) * 100) / 100}/5
          </h1>
          {rating.num_ratings > 1 ? (
            <span className="text-gray-500">({rating.num_ratings} ratings)</span>
          ) : (
            <span className="text-gray-500">({rating.num_ratings} rating)</span>
          )}
        </div>
      </div>
    </div>
  );
};

const LocationPage = () => {
  const [locations, setLocations] = useState(null);
  const [locationsRating, setLocationsRating] = useState(null);
  const [filterRatings, setFilterRatings] = useState(false);
  const [goodLocationsRating, setGoodLocationsRating] = useState(null);
  const {update, setUpdate} = useUpdate();

  const filterLocations = (locations) => {
    return locations.filter((location) =>
      goodLocationsRating.find((rating) => {
        return (
          rating.address === location.postalCode &&
          rating.postalCode === location.address
        );
      })
    );
  };

  useEffect(() => {
    axios
      .get('http://localhost:50004/locations/details') 
      .then((response) => {
        console.log("locations data", response.data.data);
        setLocations(response.data.data);
      });
  }, [update]);

  useEffect(() => {
    axios
      .get('http://localhost:50004/ratings/locations-ratings')
      .then((response) => {
        console.log("ratings data", response.data.data);
        setLocationsRating(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching ratings data:", error);
      });
  }, [update]);

  useEffect(() => {
    axios
      .get('http://localhost:50004/ratings/locations-ratings-good')
      .then((response) => {
        console.log("good ratings data", response.data.data);
        setGoodLocationsRating(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching ratings data:", error);
      });
  }, [update]);

  const ogLocations = locations;
  const filteredLocations = filterRatings ? filterLocations(locations) : ogLocations;

  return (
    <>
    <TopNavBar/>
    {locationsRating? 
    (<div className="flex h-screen">
      <div className="w-[350px] md:w-[400px] lg:w-[450px] overflow-y-auto border-r border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <h1 className="font-bold text-xl">All Locations</h1>
          {filterRatings ? (
            <button
              onClick={() => setFilterRatings(!filterRatings)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Show All Locations
            </button>
          ) : (
            <button
              onClick={() => setFilterRatings(!filterRatings)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Filter Top Rated Locations Only
            </button>
          )}
        </div>
        {filteredLocations?.map((location) => (
          <div key={location.locationID} className='py-2 transition'>
            <NavLink  key={location.locationID} to={`/locations/${location.locationID}`}
            className={({ isActive }) => {
              return isActive ? 'bg-gray-500 py-2': ''
            }}>
              <LocationElement
                location={location}
                rating={locationsRating?.find((rating) => {
                  return (
                    rating.address === location.postalCode &&
                    rating.postalCode === location.address
                  );
                })}
              />
            </NavLink>
          </div>
        ))}
      </div>

      <div className="w-2/3 p-4 pt-16">
        <Outlet />
      </div>

      <NavLink
        className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow absolute bottom-4 right-4 "
        to="/"
      >
        Return to Home
      </NavLink>
    </div>) :(
      <div> Loading... </div>
    )
}
    </>
  );
};

export default LocationPage;
