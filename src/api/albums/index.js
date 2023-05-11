import AlbumsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumsService, songsService, validator }) => {
    const albumsHandler = new AlbumsHandler(albumsService, songsService, validator);
    server.route(routes(albumsHandler));
  },
};
