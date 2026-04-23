import {useContext} from "react";
import {Link } from "react-router-dom";
import { storedUserData } from "../../context/AuthContext";


const Header =()=>{

    const context = useContext(storedUserData);

    if(!context){
        return <p>Loading...</p>
    }
    const {logout} = context;
    return(
        <>
        <div className="w-full bg-yellow-500 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">

  {/* Logo / Title */}
  <h1 className="text-lg sm:text-xl font-semibold">
    Todo App
  </h1>

  {/* Navigation Links */}
  <div className="flex gap-3 flex-wrap justify-center">

    <Link
      to="/dashboard"
      className="bg-white px-3 py-1 rounded hover:bg-gray-100 transition"
    >
      Dashboard
    </Link>

    <Link
      to="/profile"
      className="bg-white px-3 py-1 rounded hover:bg-gray-100 transition"
    >
      Profile
    </Link>

    <button
      onClick={logout}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>

  </div>

</div>
        
        </>
    )
}
export default Header;