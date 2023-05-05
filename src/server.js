import { server as _server } from '@hapi/hapi';
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

dotenv.config();

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();

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
      plugin: albums,
      options: {
        service: albumsService,
        secondService: songsService,
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
