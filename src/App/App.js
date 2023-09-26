import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AnimalList from "../AnimalList/AnimalList";
import AnimalCard from "../AnimalCard/AnimalCard";
import HomePage from "../HomePage/HomePage";
import Timeline from "../Timeline/Timeline";
import MentionsLegales from "../Footer/MentionsLegales/MentionsLegales";
import "./App.scss";

import data from "../Data/data";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/accueil" element={<HomePage />} />
            <Route path="/animaux" element={<AnimalList data={data} />} />
            <Route path="/animal/:nom" element={<AnimalCard data={data} />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
