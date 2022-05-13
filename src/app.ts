import Fastify from 'fastify';
import userRoutes from './modules/user/user.route';

const server = Fastify();

server.get('/healthcheck', async function (req, res) {
  return { status: 'OK' };
});

async function main() {
  server.register(userRoutes, { prefix: 'api/v1/users' });

  try {
    await server.listen(3000, '0.0.0.0');

    console.log('Server listening at http://localhost:3000');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
