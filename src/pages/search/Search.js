import "./Search.css";
import React, { useState } from "react";

import {
  searchMovieByName,
  searchMovieByDate,
  searchMovieByTheatre,
} from "../../graphQL/queries/searchMovie";
import { allTheatres } from "../../graphQL/queries/allTheatres";
import { useLazyQuery, useQuery } from "@apollo/client/react";

import { InputGroup, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import MovieCard from "../../components/movieCard/MovieCard";

export default function Search() {
  const [search, setSearch] = useState();
  const {
    data: allTdata,
    loading: allTLoading,
    error: allTerror,
  } = useQuery(allTheatres);
  const [mainData, setMainData] = useState([]);
  const [MBN, { data: mbnData, loading: mbnLoading, error: mbnError }] =
    useLazyQuery(searchMovieByName);
  const [MBD, { data: mbdData, loading: mbdLoading, error: mbdError }] =
    useLazyQuery(searchMovieByDate);
  const [MBT, { data: mbtData, loading: mbtLoading, error: mbtError }] =
    useLazyQuery(searchMovieByTheatre);
  const dateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  useEffect(() => {
    console.log(mbnData, mbdData, mbtData, allTdata);
    console.log(mainData);
  }, [mainData]);
  useEffect(() => {
    setMainData(mbnData?.movies?.data || []);
  }, [mbnData]);
  useEffect(() => {
    setMainData(mbdData?.movies?.data || []);
  }, [mbdData]);
  useEffect(() => {
    setMainData(mbtData?.movies?.data || []);
  }, [mbtData]);
  return (
    <div id="search-page">
      <Form className="mb-5">
        <Form.Group>
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              Search
            </InputGroup.Text>
            <Form.Control
              placeholder="yyyy-mm-dd for date & ID for theatre"
              aria-label="Search"
              aria-describedby="search-input"
              required={true}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button
              variant="dark"
              onClick={() => {
                MBN({ variables: { search: search } });
              }}
            >
              By name
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                if (dateFormat.test(search)) {
                  MBD({ variables: { search: search } });
                } else {
                  alert("Wrong format!");
                }
              }}
            >
              By date
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                MBT({ variables: { search: search } });
              }}
            >
              By theatre
            </Button>
          </InputGroup>
          <Form.Text>
            Input movie name to search movies matching that particular name
          </Form.Text>
          <br />
          <Form.Text>
            Input theatre's name to search movies in that particular theatre
          </Form.Text>
          <br />
          <Form.Text>
            Input date in yyyy-mm-dd format to search movies in that particular
            date
          </Form.Text>
        </Form.Group>
      </Form>
      {mainData?.length == 0 ? (
        <span>
          <strong>No results.</strong>
        </span>
      ) : (
        <div className="result-box">
          {mainData.map((elem, index) => {
            let mainE = elem?.attributes;
            let name = mainE?.movie_name;
            let date = mainE?.movie_date;
            let genre = mainE?.movie_genre;
            let imgUrl = mainE?.movie_poster_url;
            let id = elem?.id;
            return (
              <MovieCard
                key={index}
                date={date}
                name={name}
                genre={genre}
                id={id}
                imgURL={imgUrl}
              />
            );
            // return <br />;
          })}
        </div>
      )}

      <div className="theatres-list mt-5" style={{ width: "100%" }}>
        <strong>
          Theatres available:
          <br />
        </strong>

        <ul
          style={{
            alignSelf: "flex-start",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            width: "100%",
          }}
        >
          {allTdata?.theatres?.data?.map((thr, ind) => {
            let t_name = thr?.attributes?.theatre_name;
            let t_address = thr?.attributes?.theatre_address;
            return (
              <li key={ind}>
                {t_name}
                <br />
                {t_address}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
