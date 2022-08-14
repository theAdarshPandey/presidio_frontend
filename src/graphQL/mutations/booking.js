import { gql } from "@apollo/client";

export const booking = gql`
  mutation ($cid: ID!, $mid: ID!, $tid: ID!) {
    createBooking(data: { client: $cid, movie: $mid, theatre: $tid }) {
      data {
        id
        attributes {
          client {
            data {
              id
              attributes {
                full_name
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;
