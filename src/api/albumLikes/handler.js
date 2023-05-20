class AlbumLikesHandler {
  constructor(albumLikesService, albumsService) {
    this._albumLikesService = albumLikesService;
    this._albumsService = albumsService;
  }

  async postAlbumLikeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id } = request.params;

    await this._albumsService.getAlbumById(id);

    const isAlbumLiked = await this._albumLikesService.verifyAlbumLiked(credentialId, id);

    if (isAlbumLiked) {
      const response = h.response({
        status: 'fail',
        message: 'Sudah like ke album ini',
      });

      response.code(400);
      return response;
    }

    await this._albumLikesService.addAlbumLike(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Like',
    });

    response.code(201);
    return response;
  }

  async getAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { likes, from } = await this._albumLikesService.getAlbumLikes(id);

    if (from === 'cache') {
      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });

      response.header('X-Data-Source', from);
      return response;
    }

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });

    return response;
  }

  async deleteAlbumLikeHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id } = request.params;

    await this._albumLikesService.deleteAlbumLike(credentialId, id);

    return {
      status: 'success',
      message: 'Unlike',
    };
  }
}

export default AlbumLikesHandler;
