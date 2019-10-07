require('dotenv').config()
import {getRepository, createConnection} from 'typeorm'
import "reflect-metadata"
import { ApolloServer } from "apollo-server";
import {typeDefs} from './schema';
import { crmrganizationsize } from './entity/crmrganizationsize';

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    crmrganizationsize: () => getRepository(crmrganizationsize).findOne(4)
  }
};

createConnection({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "simplicate",
    synchronize: false,
    entities: [
      __dirname + "/entity/*.js"
    ]
  }).then(() => {
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
})

