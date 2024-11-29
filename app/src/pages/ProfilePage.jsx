import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useUpdate from "../hooks/useUpdate";
import ReviewComponent from "./../components/ReviewComponent";
import BookingComponent from "./../components/BookingComponent";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ProfilePage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { auth, setAuth } = useAuth();
  const { update } = useUpdate();

  const [userInfo, setUserInfo] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    validOldPassword: false,
    validNewPassword: false,
    validMatch: false,
  });

  const [errMsg, setErrMsg] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [ratings, setRatings] = useState(null);
  const [showRatings, setShowRatings] = useState(false);

  const [bookings, setBookings] = useState(null);
  const [showBookings, setShowBookings] = useState(false);

  // Validate passwords
  useEffect(() => {
    setValidations((prev) => ({
      ...prev,
      validNewPassword: PWD_REGEX.test(passwordData.newPassword),
      validMatch: passwordData.newPassword === passwordData.confirmPassword,
    }));
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  // Fetch user info
  useEffect(() => {
    axios
      .get(`http://localhost:50004/users/${auth.userID}`)
      .then((response) => setUserInfo(response.data.data))
      .catch((err) => console.error("Error fetching user info:", err));
  }, [auth.userID, success]);

  // Fetch user's ratings
  useEffect(() => {
    axios
      .get(`http://localhost:50004/users/${auth.userID}/ratings`)
      .then((response) => setRatings(response.data.data))
      .catch((err) => console.error("Error fetching ratings:", err));
  }, [update]);

  // Fetch user's bookings
  useEffect(() => {
    axios
      .get(`http://localhost:50004/users/${auth.userID}/bookings`)
      .then((response) => setBookings(response.data.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [update]);

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:50004/users/${userInfo.userID}/update-password`,
        { newPassword: passwordData.newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setSuccess(true);
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <>
      {userInfo && ratings && bookings? (
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>

          {/* User Information */}
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>UserID:</strong> {userInfo.userID}
            </p>
            <p>
              <strong>Full Name:</strong> {userInfo.fullName}
            </p>
            <p>
              <strong>Username:</strong> {userInfo.username}
            </p>
            <p>
              <strong>Number of Reviews:</strong> {userInfo.numReviews}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>

          {/* Change Password Button */}
          <button
            className="bg-gray-200 px-4 py-2 mt-4 border border-gray-300 rounded hover:shadow-lg transition-shadow"
            onClick={() => setChangePassword(!changePassword)}
          >
            Change Password
          </button>

          {/* Password Change Form */}
          {changePassword && (
            <div className="w-full mt-6">
              {success ? (
                <p className="text-xl font-bold text-center text-green-500">
                  Password updated successfully!
                </p>
              ) : (
                <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                  <div>
                    <label>
                      Enter Old Password:{" "}
                      {passwordData.oldPassword &&
                        (validations.validOldPassword ? "✅" : "❌")}
                    </label>
                    <input
                      type="password"
                      className="block w-full py-2 border border-gray-300 rounded-lg px-4"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>
                      Enter New Password:{" "}
                      {passwordData.newPassword &&
                        (validations.validNewPassword ? "✅" : "❌")}
                    </label>
                    <input
                      type="password"
                      className="block w-full py-2 border border-gray-300 rounded-lg px-4"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>
                      Confirm New Password:{" "}
                      {passwordData.confirmPassword &&
                        (validations.validMatch ? "✅" : "❌")}
                    </label>
                    <input
                      type="password"
                      className="block w-full py-2 border border-gray-300 rounded-lg px-4"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                    disabled={
                      !validations.validNewPassword || !validations.validMatch
                    }
                  >
                    Confirm Password Change
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Reviews and Bookings Section */}
          <div className="flex justify-between gap-8 mt-6 w-full">
            {/* Reviews */}
            <div className="w-1/2">
              <h1 className="text-xl font-bold mb-4">Your Reviews</h1>
              {ratings.length > 0 ? (
                <>
                  <button
                    className="bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
                    onClick={() => setShowRatings(!showRatings)}
                  >
                    {showRatings ? "Hide" : "Show"} Reviews
                  </button>
                  {showRatings &&
                    ratings.map((rating) => (
                      <ReviewComponent
                        key={rating.ratingID}
                        ID={rating.userID}
                        score={rating.score}
                        comment={rating.text}
                        address={rating.address}
                        postalCode={rating.postalCode}
                      />
                    ))}
                </>
              ) : (
                <p>No reviews available.</p>
              )}
            </div>

            <div className="flex justify-between gap-8 mt-6 w-full">
        {/* Bookings */}
        <div className="w-1/2">
            <h1 className="text-xl font-bold mb-4">Your Bookings</h1>
            {bookings.length > 0 ? (
            <>
            <button
                className="bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
                onClick={() => setShowBookings(!showBookings)}
                >
                {showBookings ? "Hide" : "Show"} Bookings
                </button>
                {showBookings &&
                bookings.map((booking) => (
                    <BookingComponent
                    key={booking.bookingID}
                    bookingID={booking.bookingID}
                    startTime={booking.startTime}
                    duration={booking.duration}
                    numPeople={booking.numPeople}
                    userID={booking.userID}
                    address={booking.address}
                    postalCode={booking.postalCode}
                 />
                 ))}
            </>
            ) : (
             <p>No bookings available.</p>
            )}
        </div>
        </div>
        </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            <NavLink
              className="bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
              to="/"
            >
              Return to Homepage
            </NavLink>
            <button
              className="bg-red-500 text-white px-4 py-2 border rounded-lg hover:bg-red-600 transition-shadow"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProfilePage;
