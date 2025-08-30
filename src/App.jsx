import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/pages/login';
import Register from '../src/pages/register';
import Home from '../src/pages/home';
import BinanceList from './pages/binanceList';
import BinanceD from './pages/cryptoDetails';
import SwapPage from './pages/swapPage';
import TransactionHistoryPage from './pages/transactionH';
import TransactionHistoryProvider from './context/transactionHistory'; 
const PrivateRoute = ({ children }) => {
  const sesion = JSON.parse(localStorage.getItem('sesion'));
  return sesion?.token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <TransactionHistoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/binanceList"
            element={
              <PrivateRoute>
                <BinanceList />
              </PrivateRoute>
            }
          />
          <Route
            path="/cryptoDetails"
            element={
              <PrivateRoute>
                <BinanceD />
              </PrivateRoute>
            }
          />
          <Route
            path="/swapPage"
            element={
              <PrivateRoute>
                <SwapPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/TransactionH"
            element={
              <PrivateRoute>
                <TransactionHistoryPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TransactionHistoryProvider>
  );
};

export default App;
