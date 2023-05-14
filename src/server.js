import { server as _server } from '@hapi/hapi';
import Jwt from '@hapi/jwt';

import dotenv from 'dotenv';
import ClientError from './exceptions/ClientError.js';

import albums from './api/albums/index.js';
import AlbumsService from './services/postgres/AlbumsService.js';
import AlbumValidator from './validator/albums/index.js';

import songs from './api/songs/index.js';
import SongsService from './services/postgres/SongsService.js';
import SongValidator from './validator/songs/index.js';

import users from './api/users/index.js';
import UsersService from './services/postgres/UsersService.js';
import UserValidator from './validator/users/index.js';

import authentications from './api/authentications/index.js';
import AuthenticationsService from './services/postgres/AuthenticationsService.js';
import TokenManager from './tokenize/TokenManager.js';
import AuthenticationValidator from './validator/authentications/index.js';

import collaborations from './api/collaborations/index.js';
import CollaborationsService from './services/postgres/CollaborationsService.js';
import CollaborationValidator from './validator/collaborations/index.js';

import playlists from './api/playlists/index.js';
import PlaylistsService from './services/postgres/PlaylistsService.js';
import PlaylistValidator from './validator/playlists/index.js';

dotenv.config();

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);

  const server = _server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        albumsService,
        songsService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UserValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        service: collaborationsService,
        usersService,
        playlistsService,
        validator: CollaborationValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        songsService,
        validator: PlaylistValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
