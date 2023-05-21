import CoversHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'covers',
  version: '1.0.0',
  register: async (server, { storageService, albumsService, validator }) => {
    const coversHandler = new CoversHandler(storageService, albumsService, validator);
    server.route(routes(coversHandler));
  },
};
