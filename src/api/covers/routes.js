import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: (request, h) => handler.postAlbumCoverHandler(request, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/covers/{param*}',
    handler: {
      directory: {
        path: resolve(currentDir, 'file'),
      },
    },
  },
];

export default routes;
