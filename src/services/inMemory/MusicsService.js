import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';

class MusicsService {
  constructor() {
    this._musics = [];
  }

  addAlbum({ name, year }) {
    const id = nanoid(16);

    const newAlbum = {
      id, name, year,
    };

    this._musics.push(newAlbum);

    const isSuccess = this._musics.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return id;
  }

  getAlbumById(id) {
    const album = this._musics.filter((a) => a.id === id)[0];

    if (!album) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this._musics.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }

    this._musics[index] = {
      ...this._musics[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this._musics.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
    this._musics.splice(index, 1);
  }

  // Song
  addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);

    const newSongs = {
      id,
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    };

    this._musics.push(newSongs);

    const isSuccess = this._musics.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Song gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    return this._musics;
  }

  getSongById(id) {
    const song = this._musics.filter((s) => s.id === id)[0];

    if (!song) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return song;
  }

  editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const index = this._musics.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
    }

    this._musics[index] = {
      ...this._musics[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };
  }

  deleteSongById(id) {
    const index = this._musics.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
    this._musics.splice(index, 1);
  }
}

export default MusicsService;
