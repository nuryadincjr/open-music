import AlbumLikesHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'album-likes',
  version: '1.0.0',
  register: async (server, { albumLikesService, albumsService }) => {
    const albumLikesHandler = new AlbumLikesHandler(albumLikesService, albumsService);
    server.route(routes(albumLikesHandler));
  },
};
