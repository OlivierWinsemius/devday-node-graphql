require('dotenv').config();
import { getRepository, createConnection } from 'typeorm';
import 'reflect-metadata';

import { typeDefs } from './schema';
import { crmrganizationsize } from './entity/crmrganizationsize';
import { ApolloServer, gql } from 'apollo-server';
import axios from 'axios';

const headers = {
  'Authentication-Key': 'BzpSJAC58GWBA5ibIxEuEvUWbRWSCBgk',
  'Authentication-Secret': 'gqvwVlKkwIxthbxnN7MPgyetmXHbK6sr'
};

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    organizations: () => axios
      .get(
        'https://tom2.dev.simplicate.com/api/v2/crm/organization',
        { headers }
      )
      .then(({ data }) => data.data),
    organization: (_: any, { id }: { id: string }) =>
      axios
        .get(
          'https://tom2.dev.simplicate.com/api/v2/crm/organization/' + id,
          { headers }
        )
        .then(({ data }) => data.data)
  }
};

createConnection({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 8889,
  username: 'root',
  password: 'root',
  database: 'simplicate',
  synchronize: false,
  entities: [__dirname + '/entity/*.js']
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
});
