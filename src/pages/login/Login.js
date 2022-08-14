import "./Login.css";
import React, { useState, useContext, useEffect } from "react";
import { AllContext } from "../../App";
import { Button, Form } from "react-bootstrap";
import { loginQuery } from "../../graphQL/queries/login";
import { useLazyQuery } from "@apollo/client/react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setClient, setLoginStatus, loginStatus } = useContext(AllContext);
  const navigate = useNavigate();
  const reload = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [performLogin, { loading, error, data }] = useLazyQuery(loginQuery, {
    variables: { email: email, pass: pass },
  });
  useEffect(() => {
    console.log(data);
    if (!loading && !error) {
      if (data?.clients?.data.length == 1) {
        let temp = data?.clients?.data[0]?.attributes;
        setClient({
          name: temp?.full_name,
          email: temp?.email,
          bookings: temp?.bookings,
          role: temp?.role,
          id: data?.clients?.data[0]?.id,
        });
        setLoginStatus(true);
      }
      if (data?.clients?.data.length == 0) {
        alert("Wrong password or Not registered");
        reload();
      }
    }
    if (error) {
      console.log(error);
    }
  }, [data, loading, error]);
  useEffect(() => {
    if (loginStatus) {
      navigate("/");
    }
  }, [loginStatus]);
  if (loginStatus) {
    navigate("/");
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error!!!</div>;
  }

  return (
    <div id="login-page">
      <Form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          performLogin();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              e.preventDefault();
              setPass(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="dark"
          type="submit"
          style={{ float: "right" }}
          onClick={() => {}}
        >
          Login
        </Button>
      </Form>
      <Link to="/signup">Don't have an account? Signup.</Link>
    </div>
  );
}
