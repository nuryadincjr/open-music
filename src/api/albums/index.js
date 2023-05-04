import AlbumsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, secondService, validator }) => {
    const albumsHandler = new AlbumsHandler(service, secondService, validator);
    server.route(routes(albumsHandler));
  },
};
