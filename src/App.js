import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphQL/apolloClient";

import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Admin from "./pages/admin/Admin";
import Book from "./pages/book/Book";
import Booking from "./pages/book/Booking";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";

export const AllContext = createContext();

export default function App() {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    email: "",
    bookings: {},
    role: "user",
    id: 0,
  });
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    if (loginStatus == false) {
      navigate("/");
    }
  }, [loginStatus]);
  return (
    <ApolloProvider client={apolloClient}>
      <AllContext.Provider
        value={{ client, setClient, loginStatus, setLoginStatus }}
      >
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            {loginStatus && (
              <>
                <Route path="/book" element={<Book />} />
                <Route path="/book/:id" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
                {client.role == "admin" && (
                  <Route path="/admin" element={<Admin />} />
                )}
              </>
            )}
            <Route path="*" element={<div>Not Found! Try logging in.</div>} />
          </Routes>
          <Footer />
        </div>
      </AllContext.Provider>
    </ApolloProvider>
  );
}
