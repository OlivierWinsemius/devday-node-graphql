import {  gql } from "apollo-server";

export const typeDefs =  gql`
  type Query {
    crmrganizationsize: OrganizationSize
  }

  type OrganizationSize {
    id: ID!
    name: String
  }
`;

