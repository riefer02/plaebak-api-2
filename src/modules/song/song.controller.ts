import { FastifyReply, FastifyRequest } from 'fastify';
import { createSong, getSongs } from './song.service';
import { CreateSongInput } from './song.schema';

export async function createSongHandler(
  request: FastifyRequest<{ Body: CreateSongInput }>
) {
  const song = await createSong({ ...request.body, artistId: request.user.id });

  return song;
}

export async function getSongsHandler() {
  const songs = await getSongs();

  return songs;
}
