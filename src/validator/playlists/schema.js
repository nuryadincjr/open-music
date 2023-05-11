import Joi from 'joi';

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const SongPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

export { PlaylistPayloadSchema, SongPlaylistPayloadSchema };
