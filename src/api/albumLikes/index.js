import AlbumLikesHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'album-likes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumLikesHandler = new AlbumLikesHandler(service, validator);
    server.route(routes(albumLikesHandler));
  },
};
