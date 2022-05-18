import { FastifyReply, FastifyRequest } from 'fastify';
import { createSong } from './song.service';
import { CreateSongInput } from './song.schema';

export async function createSongHandler(
  request: FastifyRequest<{ Body: CreateSongInput }>
) {
  const song = await createSong({ ...request.body, artistId: request.user.id });

  return song;
}
