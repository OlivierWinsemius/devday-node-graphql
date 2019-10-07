require('dotenv').config()
import "reflect-metadata"
import { ApolloServer, gql } from "apollo-server";
import {typeDefs} from './schema';
import organizationMock from './organizationMock.json'

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    organization: (id: string) => organizationMock
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

// @ts-ignore
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
