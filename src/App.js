import React from "react";
import Navbar from "./components/Navbar.js";
import "./App.css";
import Home from "./components/pages/MainPages/Home.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Products from "./components/pages/MainPages/Products.js";
import Maps from "./components/pages/MainPages/Maps.js";
import Login from "./components/pages/MainPages/Login.js";
import Form from "./components/pages/SubPages/Form.js";
import Summary from "./components/pages/SubPages/Summary.js";
import Description from "./components/pages/SubPages/Description.js";
import Footer from "./components/Footer.js";
import Impressum from "./components/pages/InfoPages/Impressum.js";
import Datenschutz from "./components/pages/InfoPages/Datenschutz.js";
import Nutzungsbedingungen from "./components/pages/InfoPages/Nutzungsbedingungen.js";
import IdInfoPage from "./components/pages/InfoPages/IdPage.js";
import IdSearchPage from "./components/pages/InfoPages/InfoSearch.js";
import ReportOverview from "./components/pages/MainPages/ReportOverview.js";
import SearchResult from "./components/pages/InfoPages/SearchResult.js";
import { useCookies } from "react-cookie";

/**
 * Manages the Routing between Pages
 * @returns Current Displayed Page
 */
function App() {
  const [cookies, setCookie] = useCookies([
    "session",
    "latitude",
    "kindOfReport",
    "description",
    "citizenFirstName",
  ]);
  //Responsible for not letting anyone browse Pages they are not permitted to see
  const PrivateRoutes = () => {
    console.log("Employee logged in? " + cookies.session);
    if (cookies.session !== "false") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  //Responsible for not letting People submit uncomplete Reports
  const CriticalRoutes = () => {
    if (
      cookies.latitude !== undefined &&
      cookies.citizenFirstName !== undefined &&
      cookies.kindOfReport !== undefined &&
      cookies.description !== undefined
    ) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route element={<CriticalRoutes />}>
            <Route path="/summary" element={<Summary />} />
          </Route>
          <Route path="/maps" element={<Maps />} />
          <Route path="/description" element={<Description />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route
            path="/nutzungsbedingungen"
            element={<Nutzungsbedingungen />}
          />
          <Route path="/idinfopage" element={<IdInfoPage />} />
          <Route path="/idsearch" element={<IdSearchPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/reportoverview" element={<ReportOverview />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
