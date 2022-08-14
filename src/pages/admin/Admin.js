import "./Admin.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";

import { addThea, addMovie } from "../../graphQL/mutations/forAdmin";
import { allBookings } from "../../graphQL/queries/allBookings";
import { allTheatres } from "../../graphQL/queries/allTheatres";
import { useQuery, useMutation } from "@apollo/client";

export default function Admin() {
  const navigate = useNavigate();
  const { data: QD1, loading: QL1, error: QE1 } = useQuery(allBookings);

  const { data: QD2, loading: QL2, error: QE2 } = useQuery(allTheatres);

  const [toThea, { data: MD1, loading: ML1, error: ME1 }] =
    useMutation(addThea);

  const [toMov, { data: MD2, loading: ML2, error: ME2 }] =
    useMutation(addMovie);

  const [thrState, setThrState] = useState({ name: "", address: "" });
  const [movState, setMovState] = useState({
    name: "",
    date: "",
    genre: "",
    theatres: "",
    imgUrl: "",
  });
  const [thrIds, setThrIds] = useState([]);
  useEffect(() => {
    QD2?.theatres?.data?.forEach((element) => {
      // setThrIds([...thrIds, "" + element?.id]);
      let tempArr = thrIds;
      if (!tempArr.includes(element?.id)) {
        tempArr.push(element?.id);
      }
      setThrIds(tempArr);
    });
  }, [QD2]);

  const dateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  return (
    <div id="admin-page">
      <div className="to-add-ther">
        <h2>Add Theatre:</h2>
        <Form
          className="add-thrr-form"
          onSubmit={(e) => {
            e.preventDefault();
            toThea({
              variables: { Tname: thrState.name, Taddr: thrState.address },
            })
              .then((res) => {
                console.log(res);
                alert(
                  `Successfully added ${res?.data?.createTheatre?.data?.attributes?.theatre_name} theare with ID: ${res?.data?.createTheatre?.data?.id}`
                );
                try {
                  document.location.reload();
                } catch {}
              })
              .catch((err) => {
                alert("Error!");
                console.error(err);
              });
            // console.log(thrState);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicTN">
            <Form.Label>Theatre Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name of the theatre"
              onChange={(e) => {
                setThrState({ ...thrState, name: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTA">
            <Form.Label>Theatre Address</Form.Label>
            <Form.Control
              required
              type="address"
              placeholder="Enter address of the theatre"
              onChange={(e) => {
                setThrState({ ...thrState, address: e.target.value });
              }}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Add theatre!
          </Button>
        </Form>
      </div>
      <div className="to-add-mov">
        <h2>Add Movie:</h2>
        <Form
          className="add-thrr-form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(movState);
            if (dateFormat.test(movState.date)) {
              toMov({
                variables: {
                  name: movState.name,
                  date: movState.date,
                  genre: movState.genre,
                  imgURL: movState.imgUrl,
                  thrs: movState.theatres.replace(" ", "").split(","),
                },
              })
                .then((res) => {
                  console.log(res);
                  alert("Yay! Movie added successfully!");
                  try {
                    document.location.reload();
                  } catch {}
                })
                .catch((err) => {
                  console.error(err);
                  alert("Error!!! Something went wrong.");
                  navigate("/");
                });
            } else {
              alert("Wrong date format!");
            }
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicMN">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name of the movie"
              onChange={(e) => {
                setMovState({ ...movState, name: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMD">
            <Form.Label>Movie Date</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter date of movie (format: yyyy-mm-dd)"
              onChange={(e) => {
                setMovState({ ...movState, date: e.target.value });
              }}
            />
            <Form.Text>Format: yyyy-mm-dd</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMG">
            <Form.Label>Movie Genre</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter genres of movie, use / to seperate"
              onChange={(e) => {
                setMovState({ ...movState, genre: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMT">
            <Form.Label>Movie theatres</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter theatre IDs of movie, use , to seperate"
              onChange={(e) => {
                setMovState({ ...movState, theatres: e.target.value });
              }}
            />
            <Form.Text>
              Seperate theatre IDs with comma "<strong>,</strong>"
            </Form.Text>
            <br />
            <Form.Text>You can find theatre IDs below</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMT">
            <Form.Label>Movie Poster URL</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter url of the movie's poster"
              onChange={(e) => {
                setMovState({ ...movState, imgUrl: e.target.value });
              }}
            />
          </Form.Group>
          <Card
            className="bg-dark text-white"
            style={{ height: "30vh", width: "30%" }}
          >
            <Card.Img
              src={movState.imgUrl}
              alt="Card image"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
            <Card.ImgOverlay
              bsPrefix="card-img-overlay d-flex flex-column"
              style={{ justifyContent: "flex-end" }}
            >
              <Card.Title>Image Preview</Card.Title>
              <Card.Text>
                This is a preview of the image link you provided to check its
                valiation.
              </Card.Text>
            </Card.ImgOverlay>
          </Card>

          <Button variant="dark" type="submit" className="mt-5">
            Add Movie!
          </Button>
        </Form>
      </div>
      <div className="to-view-ther">
        <h3>List of theatres:</h3>
        <ol>
          {QD2?.theatres?.data?.map((thr, ind) => {
            let name = thr?.attributes?.theatre_name;
            let addr = thr?.attributes?.theatre_address;
            return (
              <li key={ind}>
                <span>Name: {name}</span>
                <br />
                <span>Address: {addr}</span>
                <br />
                <span>ID: {thr?.id}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="to-view-bookings">
        <h2>List of bookings:</h2>
        <ul>
          {QD1?.bookings?.data?.map((book, index) => {
            let client = book?.attributes?.client?.data?.attributes?.full_name;
            let movie = book?.attributes?.movie?.data?.attributes?.movie_name;
            let theatre =
              book?.attributes?.theatre?.data?.attributes?.theatre_name;
            return (
              <li key={index}>
                <span>Client: {client}</span>
                <br />
                <span>Movie: {movie}</span>
                <br />
                <span>Theatre: {theatre}</span>
                <br />
                <span>ID: {book?.id}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
