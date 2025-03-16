import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProductsProvider } from './context/ProductsContext';
import { OrderProvider } from './context/OrderContext';
import { MatrixProvider } from './context/MatrixContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
       <NotificationProvider>
         <ProductsProvider>
            <OrderProvider>
              <MatrixProvider>
                 <App />
              </MatrixProvider>
            </OrderProvider>
         </ProductsProvider>
       </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);