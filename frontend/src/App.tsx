import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import HTTPCats from './pages/HTTPCats';
import Login from './pages/Login';
import Main from './pages/Main';
import RandomDog from './pages/RandomDog';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/httpcats" element={<HTTPCats />} />
        <Route path="/random-dog" element={<RandomDog />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </div>
  );
}

export default App;
