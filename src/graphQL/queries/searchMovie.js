import { gql } from "@apollo/client";

export const searchMovieByName = gql`
  query ($search: String!) {
    movies(filters: { movie_name: { contains: $search } }) {
      data {
        id
        attributes {
          movie_name
          movie_date
          movie_poster_url
          movie_genre
        }
      }
    }
  }
`;
export const searchMovieByDate = gql`
  query ($search: Date!) {
    movies(filters: { movie_date: { eq: $search } }) {
      data {
        id
        attributes {
          movie_name
          movie_date
          movie_poster_url
          movie_genre
        }
      }
    }
  }
`;
export const searchMovieByTheatre = gql`
  query ($search: String!) {
    movies(filters: { theatres: { theatre_name: { contains: $search } } }) {
      data {
        id
        attributes {
          movie_name
          movie_date
          movie_poster_url
          movie_genre
        }
      }
    }
  }
`;
