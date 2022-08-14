import { gql } from "@apollo/client";

export const addThea = gql`
  mutation addThea($Tname: String!, $Taddr: String!) {
    createTheatre(data: { theatre_name: $Tname, theatre_address: $Taddr }) {
      data {
        id
        attributes {
          theatre_name
          theatre_address
        }
      }
    }
  }
`;

export const addMovie = gql`
  mutation addMovie(
    $name: String!
    $date: Date!
    $genre: String!
    $imgURL: String!
    $thrs: [ID!]!
  ) {
    createMovie(
      data: {
        movie_name: $name
        movie_date: $date
        movie_genre: $genre
        movie_poster_url: $imgURL
        theatres: $thrs
      }
    ) {
      data {
        id
        attributes {
          movie_name
          movie_date
          movie_genre
          movie_poster_url
          theatres {
            data {
              id
              attributes {
                theatre_name
                theatre_address
              }
            }
          }
        }
      }
    }
  }
`;
