import "./Header.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { AllContext } from "../../App";

export default function Header() {
  const { loginStatus, setLoginStatus, setClient, client } =
    useContext(AllContext);
  const logoSVG =
    "https://www.presidio.com/icheestu/2021/02/Presidio-blue-logo.svg";
  return (
    <header id="header">
      <Link to={"/"}>
        <img src={logoSVG}></img>
      </Link>

      {loginStatus && client.role == "admin" && (
        <Link to={"/admin"}>
          <Button variant="dark">ADMIN</Button>
        </Link>
      )}

      <Link to={"/search"}>
        <Button variant="dark">Search</Button>
      </Link>

      {!loginStatus && (
        <Link to={"/login"}>
          <Button variant="dark">Login</Button>
        </Link>
      )}

      {loginStatus && (
        <>
          <Link to={"/profile"}>
            <Button variant="dark">Profile</Button>
          </Link>
          <Link to={"/"}>
            <Button
              variant="dark"
              onClick={() => {
                setClient({
                  name: "",
                  email: "",
                  bookings: {},
                  role: "user",
                });
                setLoginStatus(false);
                alert("You have been successfully signed out!");
              }}
            >
              Signout
            </Button>
          </Link>
        </>
      )}
    </header>
  );
}
