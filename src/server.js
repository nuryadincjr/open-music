import { server as _server } from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import Inert from '@hapi/inert';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
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

import _exports from './api/exports/index.js';
import ProducerService from './services/rabbitmq/ProducerService.js';
import ExportsValidator from './validator/exports/index.js';

import covers from './api/covers/index.js';
import StorageService from './services/storage/StorageService.js';
import CoversValidator from './validator/covers/index.js';

import albumLikes from './api/albumLikes/index.js';
import AlbumLikesService from './services/postgres/AlbumLikesService.js';

import CacheService from './services/redis/CacheService.js';

dotenv.config();

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);

  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFilePath);
  const storageService = new StorageService(resolve(currentDir, 'api/covers/file/images'));

  const cacheService = new CacheService();
  const albumLikesService = new AlbumLikesService(cacheService);

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
    {
      plugin: Inert,
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
    {
      plugin: _exports,
      options: {
        service: ProducerService,
        playlistsService,
        validator: ExportsValidator,
      },
    },
    {
      plugin: covers,
      options: {
        storageService,
        albumsService,
        validator: CoversValidator,
      },
    },
    {
      plugin: albumLikes,
      options: {
        albumLikesService,
        albumsService,
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
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
