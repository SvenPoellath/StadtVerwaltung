import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/MainPages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/pages/MainPages/Products";
import Maps from "./components/pages/MainPages/Maps";
import Login from "./components/pages/MainPages/Login";
import Form from "./components/pages/SubPages/Form";
import Summary from "./components/pages/SubPages/Summary";
import Description from "./components/pages/SubPages/Description";
import Footer from "./components/Footer";
import Impressum from "./components/pages/InfoPages/Impressum";
import Datenschutz from "./components/pages/InfoPages/Datenschutz";
import Nutzungsbedingungen from "./components/pages/InfoPages/Nutzungsbedingungen";
import IdInfoPage from "./components/pages/InfoPages/IdPage";
import IdSearchPage from "./components/pages/InfoPages/InfoSearch";
import ReportOverview from "./components/pages/MainPages/ReportOverview";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/description" element={<Description />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route
            path="/nutzungsbedingungen"
            element={<Nutzungsbedingungen />}
          />
          <Route path="/idinfopage" element={<IdInfoPage />} />
          <Route path="/idsearch" element={<IdSearchPage />} />
          <Route path="/reportoverview" element={<ReportOverview />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
