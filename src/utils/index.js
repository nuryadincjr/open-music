/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapDBToModelAlbum = ({
  id,
  name,
  year,
  cover_url,
}) => ({
  id,
  name,
  year,
  coverUrl: cover_url,
});

export { mapDBToModel, mapDBToModelAlbum };
