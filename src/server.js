import { server as _server } from '@hapi/hapi';
import musics from './api/musics/index.js';
import MusicsService from './services/inMemory/MusicsService.js';
import MusicValidator from './validator/musics/index.js';

const init = async () => {
  const musicsService = new MusicsService();

  const server = _server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
      validator: MusicValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
