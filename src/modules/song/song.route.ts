import { FastifyInstance } from 'fastify';
import { createSongHandler } from './song.controller';
import { $ref } from './song.schema';

async function songRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref('createSongSchema'),
        response: { 201: $ref('songResponseSchema') },
      },
    },
    createSongHandler
  );
}
export default songRoutes;
