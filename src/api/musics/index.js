import MusicsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'musics',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const musicsHandler = new MusicsHandler(service, validator);
    server.route(routes(musicsHandler));
  },
};
