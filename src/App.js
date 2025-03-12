import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './Pages/Home/Home';
import Profile from './Pages/profile/profile';
import AdminDisplay from './Pages/AdminDisplay/AdminDisplay';
import PrivateRoute from './private/PrivateRoute';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home/>} />

        
        <Route path='/profile' element={<PrivateRoute element={<Profile />}/>} />

        {/* Admin */}
        <Route path='/admin-dashboard' element={<PrivateRoute element={<AdminDisplay />} />} />
      </Routes>
    </Router>
  );
}

export default App;
