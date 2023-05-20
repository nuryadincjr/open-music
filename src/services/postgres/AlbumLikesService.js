import pkg from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';
import { mapDBToModelAlbum } from '../../utils/index.js';

const { Pool } = pkg;

class AlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbumCover(cover) {
    // TODO
  }

  async addAlbumLike(cover) {
    // TODO
  }

  async getAlbumLike(cover) {
    // TODO
  }

  async deleteAlbumLike(cover) {
    // TODO
  }
}

export default AlbumLikesService;
