import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fjwt, { JWT } from 'fastify-jwt';
import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';
import userRoutes from './modules/user/user.route';
import songRoutes from './modules/song/song.route';
import { userSchemas } from './modules/user/user.schema';
import { songSchemas } from './modules/song/song.schema';
import { version } from '../package.json';

// custom types

declare module 'fastify-jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}
declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

export const server = Fastify();

server.register(fjwt, { secret: process.env.JWT_SECRET });

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.get('/healthcheck', async function (req, res) {
  return { status: 'OK' };
});

async function main() {
  // Register Schemas Before Routes
  const schemas = [...userSchemas, ...songSchemas];

  for (const schema of schemas) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: '/docs',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Plaebak API',
          description: 'API for Plaebak Audio Corp.',
          version,
        },
      },
    })
  );
  server.register(userRoutes, { prefix: 'api/v1/users' });
  server.register(songRoutes, { prefix: 'api/v1/songs' });

  try {
    await server.listen(3000, '0.0.0.0');

    console.log('Server listening at http://localhost:3000');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
