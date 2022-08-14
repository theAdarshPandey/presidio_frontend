import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Book() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, []);
  return <div>Book</div>;
}
