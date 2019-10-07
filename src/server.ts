require('dotenv').config()
import {getRepository, createConnection} from 'typeorm'
import "reflect-metadata"
import { ApolloServer } from "apollo-server";
import {typeDefs} from './schema';
import { crmrganizationsize } from './entity/crmrganizationsize';
import axios from 'axios'

const headers = {
  'Authentication-Key': '7sb3dywHL14AQaXsbHP0DkNhGUDdO6pM',
  "Authentication-Secret": 'oqGsP2ZqTTRzTESVcxLGHpNeahiOexrs'
}

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    organization: (_: any, {id}: {id: string}) => axios.get(
      'https://olivier.dev.simplicate.com/api/v2/crm/organization/' + id,
      {headers}
    ).then(({data}) => { return data.data})
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

