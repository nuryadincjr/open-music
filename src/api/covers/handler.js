class CoversHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._validator = validator;
  }

  async postAlbumCoverHandler(request, h) {
    const { id } = request.params;
    const { cover } = request.payload;

    this._validator.validateCoverHandlers(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/covers/images/${filename}`;

    const tes = await this._albumsService.editAlbumCoverById(coverUrl, id);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      tes,
    });
    response.code(201);
    return response;
  }
}

export default CoversHandler;
