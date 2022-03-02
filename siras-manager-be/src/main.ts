import { createServer } from '@graphql-yoga/node';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

async function main() {
  const server = createServer({
    schema: {
      typeDefs,
      resolvers
    }
  })
  await server.start()
}

main();
