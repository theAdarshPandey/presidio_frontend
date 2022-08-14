import "./Home.css";
import React from "react";

import { useQuery } from "@apollo/client/react";
import { allMovies } from "../../graphQL/queries/allMovies";
import MovieCard from "../../components/movieCard/MovieCard";

export default function Home() {
  const { data, loading, error } = useQuery(allMovies);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!!!</div>;
  }
  return (
    <div id="home">
      {console.log(data)}
      {data?.movies?.data?.map((movie, index) => {
        let mainc = movie.attributes;
        return (
          <MovieCard
            name={mainc?.movie_name}
            date={mainc?.movie_date}
            genre={mainc?.movie_genre}
            imgURL={mainc?.movie_poster_url}
            id={movie?.id}
            key={index}
          />
        );
      })}
    </div>
  );
}
