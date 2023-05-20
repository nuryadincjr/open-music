import ExportstHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { service, playlistsService, validator }) => {
    const exportsHandler = new ExportstHandler(service, playlistsService, validator);
    server.route(routes(exportsHandler));
  },
};
