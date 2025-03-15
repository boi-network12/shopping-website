import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './Pages/Home/Home';
import Profile from './Pages/profile/profile';
import AdminDisplay from './Pages/AdminDisplay/AdminDisplay';
import PrivateRoute from './private/PrivateRoute';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import Checkout from './Pages/Checkout/Checkout';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home/>} />

        {/* protected route */}
        <Route path='/profile' element={<PrivateRoute element={<Profile />}/>} />
        <Route path='/products-details/:productId' element={<PrivateRoute element={<ProductsPage/>}/>} />
        <Route path='/checkout' element={<PrivateRoute element={<Checkout/>}/>} />

        {/* Admin */}
        <Route path='/admin-dashboard' element={<PrivateRoute element={<AdminDisplay />} />} />
      </Routes>
    </Router>
  );
}

export default App;
