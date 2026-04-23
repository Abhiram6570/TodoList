import React,{useState, useContext} from "react";
import {storedUserData} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


interface userDataTypes {
    email:string,
    password:string
}

const intialStateUserData = {
        email:"Demo@gamil.com",
        password:"Demo@123."
    }

const Login =()=>{
    const navigate = useNavigate();
    const [userData, setUserData] = useState<userDataTypes>(intialStateUserData);


    const context = useContext(storedUserData);

if (!context) {
  throw new Error("AuthContext not found");
}


    const {setUserDetails} = context;

    
    const handlerChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        setUserData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handlerSubmit = (e:React.SubmitEvent) =>{
        e.preventDefault();
        console.log("userData", userData);
        setUserDetails(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
        
        
    }

    const isValid = userData.email  && userData.password

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        
        <form 
            onSubmit={handlerSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-bold text-center mb-6">
                Login
            </h2>

            {/* Email */}
            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="demo@gmail.com"
                    value={userData.email}
                    onChange={handlerChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            {/* Password */}
            <div className="mb-6">
                <label className="block mb-1 text-sm font-medium">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={userData.password}
                    onChange={handlerChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={!isValid}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            >
                Login
            </button>
        </form>
    </div>
);
}
export default Login;