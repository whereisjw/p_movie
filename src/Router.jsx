import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Tv from "./Pages/Tv";
import Header from "./Components/Header";
import Modal from "./Components/Modal";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/movies/:id" element={<Modal />}></Route>
          </Route>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
