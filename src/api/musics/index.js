import MusicsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'musics',
  version: '1.0.0',
  register: async (server) => {
    const musicsHandler = new MusicsHandler();
    server.route(routes(musicsHandler));
  },
};
