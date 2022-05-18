import prisma from '../../utils/prisma';
import { CreateSongInput } from './song.schema';

export async function createSong(data: CreateSongInput & { artistId: number }) {
  return prisma.song.create({ data });
}

export async function getSongs() {
  return prisma.song.findMany({
    select: {
      content: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      id: true,
      artist: { select: { name: true, id: true } },
    },
  });
}
