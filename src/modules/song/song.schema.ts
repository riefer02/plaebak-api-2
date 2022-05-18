import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const songInput = {
  title: z.string(),
  content: z.string().optional(),
};

const songGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createSongSchema = z.object({ ...songInput });

const songResponseSchema = z.object({ ...songInput, ...songGenerated });

const songsResponseSchema = z.array(songResponseSchema);

export type CreateSongInput = z.infer<typeof createSongSchema>;

export const { schemas: songSchemas, $ref } = buildJsonSchemas({
  createSongSchema,
  songResponseSchema,
  songsResponseSchema,
});
