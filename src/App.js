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
import Summary from './components/pages/Summary';
import Description from './components/pages/Description';
import Footer from './components/Footer';
import Impressum from './components/pages/Impressum';
import Datenschutz from './components/pages/Datenschutz';
import Nutzungsbedingungen from './components/pages/Nutzungsbedingungen';
import IdInfoPage from './components/pages/IdPage';
import IdSearchPage from './components/pages/InfoSearch';


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
          <Route path='/summary' element={<Summary/>}/>
          <Route path='/description' element={<Description/>}/>
          <Route path='/impressum' element={<Impressum/>}/>
          <Route path='/datenschutz' element={<Datenschutz/>}/>
          <Route path='/nutzungsbedingungen' element={<Nutzungsbedingungen/>}/>
          <Route path='/idinfopage' element={<IdInfoPage/>}/>
          <Route path='/idsearch' element={<IdSearchPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
