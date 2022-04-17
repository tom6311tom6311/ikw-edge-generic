import { createServer } from '@graphql-yoga/node';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import JwtUtils from './utils/JwtUtils';

async function main() {
  const server = createServer({
    schema: {
      typeDefs,
      resolvers,
    },
    context: (req) => ({
      claims: JwtUtils.parseToken(req.request.headers.get('x-token') || '', process.env.JWT_SECRET || ''),
    }),
  })
  await server.start()
}

main();
