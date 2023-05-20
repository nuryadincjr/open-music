import pkg from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

const { Pool } = pkg;

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumLike(userId, albumId) {
    const id = `album-like${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO album_likes values ($1, $2, $3)',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal like album');
    }

    await this._cacheService.delete(`album-likes:${albumId}`);
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`album-likes:${albumId}`);
      return {
        likes: JSON.parse(result),
        from: 'cache',
      };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM album_likes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(query);

      await this._cacheService.set(`album-likes:${albumId}`, JSON.stringify(result.rowCount));

      return {
        likes: result.rowCount,
      };
    }
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal unlike album');
    }

    await this._cacheService.delete(`album-likes:${albumId}`);
  }

  async verifyAlbumLiked(userId, albumId) {
    const query = {
      text: 'SELECT * FROM album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount > 0;
  }
}

export default AlbumLikesService;
