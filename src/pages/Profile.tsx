import  { useContext } from "react";
import { storedUserData } from "../context/AuthContext";

const Profile = () => {
  const context = useContext(storedUserData);

  // ✅ Safety check
  if (!context) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const { userDetails, logout } = context;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 py-6">
      <div className="w-full max-w-md bg-white p-5 sm:p-6 rounded-xl shadow-lg">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Profile Page
        </h1>

        {/* User Details */}
        <div className="space-y-4">

          {/* Email */}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium break-words">
              {userDetails.email || "Not available"}
            </p>
          </div>

          {/* Password */}
          <div>
            <p className="text-sm text-gray-500">Password</p>
            <p className="font-medium">
              {userDetails.password ? "••••••••" : "Not available"}
            </p>
          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;