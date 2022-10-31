import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Maps from './components/pages/Maps';
import Login from './components/pages/Login';
import Form from './components/pages/Form';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/maps' element={<Maps />} />
          <Route path='/login' element={<Login />} />
          <Route path='/form' element={<Form />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
