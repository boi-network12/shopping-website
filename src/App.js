import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './Pages/Home/Home';
import Profile from './Pages/profile/profile';
import AdminDisplay from './Pages/AdminDisplay/AdminDisplay';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home/>} />

        
        <Route path='/profile' element={<Profile />} />

        {/* Admin */}
        <Route path='/admin-dashboard' element={<AdminDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
