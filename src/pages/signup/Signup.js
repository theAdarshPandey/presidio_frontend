import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { useMutation } from "@apollo/client/react";
import { signup } from "../../graphQL/mutations/signup";
import { useEffect } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [callSignup, { loading, error, data }] = useMutation(signup, {
    variables: { name: name, email: email, password: password },
  });
  useEffect(() => {
    console.log(data);
    if (data?.createClient?.data?.attributes?.role == "user") {
      alert("Successfully Signed up ! Please Head to login page.");
      navigate("/login");
    }
    if (error) {
      alert("Email alreay existes!");
    }
  }, [data, error]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div id="signup-page">
      <Form
        id="signup-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.length >= 3) {
            if (password.length >= 8) {
              if (password == repassword) {
                callSignup();
              } else {
                alert("Passwords do not match!");
              }
            } else {
              alert("Password's length cannout be less than 8");
            }
          } else {
            alert("Name's length cannout be less than 3");
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Set your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRePassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter your password"
            onChange={(e) => setRepassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="dark" type="submit" style={{ float: "right" }}>
          Signup
        </Button>
      </Form>
    </div>
  );
}
