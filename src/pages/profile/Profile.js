import "./Profile.css";
import React from "react";
import { useContext } from "react";
import { AllContext } from "../../App";
import { useQuery } from "@apollo/client/react";
import { profile } from "../../graphQL/queries/profile";
import { useState } from "react";
import { useEffect } from "react";

export default function Profile() {
  const { client } = useContext(AllContext);
  const { data, loading, error } = useQuery(profile, {
    variables: { id: client.id },
  });
  var [datadata, setdatadata] = useState(data?.client?.data?.attributes);
  useEffect(() => {
    setdatadata(data?.client?.data?.attributes);
  }, [data]);
  console.log(data);
  return (
    <div id="profile-page">
      <h1>{datadata?.full_name}</h1>
      <span>Role: {datadata?.role}</span>
      <br />
      <span>Email: {datadata?.email}</span>
      <br />
      <span>Your bookinks are as follows :-</span>
      <br />
      <ol>
        {datadata?.bookings?.data?.map((booking, index) => {
          var movie = booking?.attributes?.movie?.data?.attributes?.movie_name;
          var theatre =
            booking?.attributes?.theatre?.data?.attributes?.theatre_name;
          return (
            <li key={index}>
              Movie: {movie}
              <br />
              Theatre: {theatre}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
