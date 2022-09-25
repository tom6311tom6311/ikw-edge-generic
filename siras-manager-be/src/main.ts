import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer } from '@graphql-yoga/node';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import JwtUtils from './utils/JwtUtils';

async function main() {
  const app = express();
  const graphQLServer = createServer({
    schema: {
      typeDefs,
      resolvers,
    },
    context: (req) => ({
      claims: JwtUtils.parseToken(req.request.headers.get('x-token') || '', process.env.JWT_SECRET || ''),
    }),
  });

  app.use('/graphql', graphQLServer);

  // serve static files
  app.get('/snapshot/:cameraId', (req, res) => {
    const { cameraId } = req.params;
    const snapshotFilePath = path.join(__dirname, `../snapshots/camera_${cameraId}.jpg`);

    if (fs.existsSync(snapshotFilePath)) {
      res.sendFile(snapshotFilePath);
    } else {
      res.sendFile(path.join(__dirname, '../snapshots/broken.jpg'));
    }
  });

  app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
  });
}

main();
