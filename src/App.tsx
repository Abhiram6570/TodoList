
import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom";



import Login from "./components/Login";
import Layout from "./layout/Layout";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';





function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  index path="/" element={<Login/>}></Route>
        <Route element={<Layout/>}>
            <Route  path="/dashboard" element={<Dashboard/>}></Route>
            <Route  path="/profile" element={<Profile/>}></Route>

        </Route>
      </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
