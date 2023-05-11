class PlaylistsHandler {
  constructor(service, songsService, validator) {
    this._service = service;
    this._songsService = songsService;
    this._validator = validator;
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({
      name, owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validateSongPlaylistPayload(request.payload);

    const { songId } = request.payload;
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const action = 'add';

    await this._service.verifyPlaylistAccess(id, credentialId);
    await this._songsService.getSongById(songId);
    await this._service.addSongToPlaylist({ id, songId });
    await this._service.addPlaylistActivity({
      id, songId, userId: credentialId, action,
    });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async getSongsInPlaylistsHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(id, credentialId);

    const playlist = await this._service.getPlaylistById(id);
    const songs = await this._service.getSongsInPlaylist(id);

    return {
      status: 'success',
      data: {
        ...playlist,
        songs,
      },
    };
  }

  async getActivitiesPlaylistsHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess({ id, owner: credentialId });

    const activitiesFiltered = await this._service.getPlaylistActivities(id);

    return {
      status: 'success',
      data: {
        id,
        activities: activitiesFiltered.map((activity) => ({
          username: activity.username,
          title: activity.title,
          action: activity.action,
          time: activity.time,
        })),
      },
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus.',
    };
  }

  async deleteSongFromPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const action = 'delete';

    await this._service.verifyPlaylistAccess({ id, owner: credentialId });
    await this._service.deleteSongFromPlaylistById(id, songId);
    await this._service.addPlaylistActivity({
      id, songId, userId: credentialId, action,
    });

    return {
      status: 'success',
      message: 'Song berhasil dihapus dari playlist',
    };
  }
}

export default PlaylistsHandler;
