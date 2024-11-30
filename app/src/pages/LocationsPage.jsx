import {useRef, useState, useEffect} from 'react';
import { NavLink, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from '../api/axios';
import TopNavBar from '../components/TopNavBar';
import useAuth from '../hooks/useAuth';
import useUpdate from '../hooks/useUpdate';

const LocationElement = (props) => {
  const { location, rating } = props;

  
  const avgRating = rating?.avg_rating || 0;
  const numRatings = rating?.num_ratings || 0; 

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
              avgRating >= 4
                ? "text-green-500"
                : avgRating >= 2.5
                ? "text-yellow-500"
                : "text-red-300"
            }
          >
            {Math.round((avgRating + Number.EPSILON) * 100) / 100}/5
          </h1>
          <span className="text-gray-500">
            ({numRatings} {numRatings === 1 ? "rating" : "ratings"})
          </span>
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
  const [num, setNum] = useState("");
  const [filteredLocationsByNum, setFilteredLocationsByNum] = useState(null);

  const [categories, setCategories] = useState("");
  const [filterCategories, setFilterCategories] = useState(false);
  const [filteredLocationsByCat, setFilteredLocationsByCat] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:50004/locations/details").then((response) => {
      console.log("locations data", response.data.data);
      setLocations(response.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:50004/ratings/locations-ratings")
      .then((response) => {
        console.log("ratings data", response.data.data);
        setLocationsRating(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching ratings data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:50004/ratings/locations-ratings-good")
      .then((response) => {
        console.log("good ratings data", response.data.data);
        setGoodLocationsRating(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching good ratings data:", error);
      });
  }, []);

  const handleNumFilter = () => {
    axios
      .get(`http://localhost:50004/ratings/locations-ratings-greater/${num}`)
      .then((response) => {
        console.log("greater ratings data", response.data.data);
        setFilteredLocationsByNum(response.data.data);
        setFilterRatings(false);
      })
      .catch((error) => {
        console.error("Error fetching greater ratings data:", error);
      });
  };

  const handleCategories = () => {
    axios
      .get(`http://localhost:50004/locations/categories/${encodeURIComponent(categories)}`)
      .then((response) => {
        console.log("categories data", response.data.data);
        setFilteredLocationsByCat(response.data.data);
      })
      .catch((error) => {
        console.error("Error getting categories filter", error);
      });
  };

  useEffect(() => {
    console.log("Filtered Locations by Category:", filteredLocationsByCat);
    console.log(filteredLocationsByCat)
    setFilterCategories(true)
  }, [filteredLocationsByCat]);

  const handleCategoryReset = () => {
    setCategories("");
    setFilterCategories(false);
    setFilteredLocationsByCat(null);
  };

  // Combine all filters
  const filteredLocations = filterRatings
    ? locations.filter((location) =>
        goodLocationsRating?.find(
          (rating) =>
            rating.address === location.postalCode &&
            rating.postalCode === location.address
        )
      )
    : filteredLocationsByNum
    ? locations.filter((location) =>
        filteredLocationsByNum?.find(
          (rating) =>
            rating.address === location.postalCode &&
            rating.postalCode === location.address
        )
      )
    : locations;


    const categorizedLocations =
    filterCategories && filteredLocationsByCat
      ? filteredLocations.filter((location) =>
          filteredLocationsByCat.find(
            (cat) =>
              cat.postalCode === location.postalCode &&
              cat.address === location.address
          )
        )
      : filteredLocations;

  return (
    <>
      <TopNavBar />
      {locationsRating && locations ? (
        <div className="flex h-screen">
          <div className="w-[400px] md:w-[450px] lg:w-[500px] overflow-y-auto border-r border-gray-200 p-4">
            <div className="flex flex-col space-y-4 mb-4">
              <h1 className="font-bold text-xl">All Locations</h1>
              <button
                onClick={() => {
                  setFilterRatings(!filterRatings);
                  setFilteredLocationsByNum(null);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {filterRatings
                  ? "Show All Locations"
                  : "Filter Top Rated Locations Only"}
              </button>

              <div className="flex space-x-2 items-center">
              <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Enter min rating"
              value={num}
              onChange={(e) => {
               const value = e.target.value;
               if (
                /^\d{1,1}(\.\d{0,2})?$/.test(value) &&
                (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 5))
                ) {
               setNum(value);
                }
                }}
                className="px-4 py-2 border border-gray-300 rounded"
                 maxLength="4"
                />
                <button
                  onClick={handleNumFilter}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Filter by Rating
                </button  >
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => {
                  setNum('');
                }}
                > Reset</button>
              </div>

              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder="Enter a Category"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleCategories}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Filter by Categories
                </button>
                <button
                  onClick={handleCategoryReset}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Reset Categories
                </button>
              </div>
            </div>

            {categorizedLocations.map((location) => (
              <div key={location.locationID} className="py-2 transition">
                <NavLink
                  key={location.locationID}
                  to={`/locations/${location.locationID}`}
                  className={({ isActive }) =>
                    isActive ? "bg-gray-500 py-2" : ""
                  }
                >
                  <LocationElement
                    location={location}
                    rating={locationsRating?.find(
                      (rating) =>
                        rating.address === location.postalCode &&
                        rating.postalCode === location.address
                    )}
                  />
                </NavLink>
              </div>
            ))}
          </div>

          <div className="w-2/3 p-4 pt-16">
            <Outlet />
          </div>

          <NavLink
            className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow absolute bottom-4 right-4"
            to="/"
          >
            Return to Home
          </NavLink>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default LocationPage;
