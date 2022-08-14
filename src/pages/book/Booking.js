import "./Booking.css";
import { Button } from "react-bootstrap";

import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../../App";

import { useParams, useNavigate } from "react-router-dom";

import { useMutation, useQuery, useLazyQuery } from "@apollo/client/react";
import { booking } from "../../graphQL/mutations/booking";
import { theatre } from "../../graphQL/queries/theatresofMovie";
import { getBookings } from "../../graphQL/queries/getBookings";

export default function Booking() {
  const navigate = useNavigate();
  const { client } = useContext(AllContext);
  let { id } = useParams();

  const [tID, setTID] = useState(0);
  const [seatsAva, setSeatsAva] = useState(-1);

  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
  } = useQuery(theatre, { variables: { mid: id } });

  var movie = movieData?.movie?.data?.attributes;

  const [
    doBook,
    { data: afterbookData, loading: afterbookLoading, error: afterbookError },
  ] = useMutation(booking);

  const [gBooks, { data: getBdata, loading: getBLoading, error: getBerror }] =
    useLazyQuery(getBookings);

  useEffect(() => {
    var tmp = afterbookData?.createBooking?.data?.attributes?.client?.data;
    if (tmp?.id == client.id) {
      alert("Yay! Successfully booked your ticket!");
      navigate("/");
    }
  }, [afterbookData]);

  useEffect(() => {
    gBooks({ variables: { movie_ID: id, theatre_ID: tID } });
  }, [tID]);

  useEffect(() => {
    // console.log("----", getBdata);
    setSeatsAva(60 - (getBdata?.bookings?.data?.length || 61));
  }, [getBdata]);

  return (
    <div id="booking-page">
      <div>
        <h1>{"Book ticket for " + movie?.movie_name}</h1>
        <p>Genre: {movie?.movie_genre}</p>
        <p>Date: {movie?.movie_date}</p>
      </div>
      <div>
        <p>
          <strong>Theatres available:-</strong>
        </p>
        <ol>
          {movie?.theatres?.data?.map((thr, ind) => {
            return <li key={ind}>{thr?.attributes?.theatre_name}</li>;
          })}
        </ol>
      </div>
      <div>
        <p>
          <strong>Theatre selected: {tID == 0 ? "None" : tID}</strong>
        </p>
        <p>
          <strong>Seats Available: {seatsAva == -1 ? "N/A" : seatsAva}</strong>
        </p>
        <span>Select Theatre: </span>
        <div className="thr-btns">
          {movie?.theatres?.data?.map((thr, ind) => {
            return (
              <Button
                key={ind}
                onClick={() => {
                  setTID(ind + 1);
                }}
                variant="dark"
              >
                {ind + 1}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <p>Click to confirm booking:-</p>
        <Button
          variant="dark"
          onClick={() => {
            if (tID != 0) {
              if (seatsAva >= 1) {
                doBook({ variables: { cid: client.id, mid: id, tid: tID } });
              } else {
                alert("Sorry, all seats booked!");
              }
            } else {
              alert("Please select the theatre first!");
            }
          }}
        >
          Book now!
        </Button>
      </div>
    </div>
  );
}
