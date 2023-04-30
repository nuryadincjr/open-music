// import { nanoid } from 'nanoid';
// import musics from './musics.js';

// const httpStatus = {
//   badRequest: 400,
//   internalServerError: 500,
//   success: 200,
//   created: 201,
//   notFound: 404,
// };

// const addAlbumHandler = (request, h) => {
//   const {
//     name,
//     year,
//   } = request.payload;

//   if (name === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan album. Mohon isi name album',
//     });
//     response.code(httpStatus.badRequest);

//     return response;
//   }

//   if (year === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan album. Mohon isi year album',
//     });
//     response.code(httpStatus.badRequest);

//     return response;
//   }

//   if (typeof year !== 'number') {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan album. Year harus berupa angka',
//     });
//     response.code(httpStatus.badRequest);
//     return response;
//   }

//   const id = nanoid(16);

//   const newAlbum = {
//     id,
//     name,
//     year,
//   };

//   musics.push(newAlbum);

//   const isSuccess = musics.filter((album) => album.id === id).length > 0;

//   if (isSuccess) {
//     const response = h.response({
//       status: 'success',
//       data: {
//         albumId: id,
//       },
//     });
//     response.code(httpStatus.created);

//     return response;
//   }

//   const response = h.response({
//     status: 'error',
//     message: 'Buku gagal ditambahkan',
//   });
//   response.code(httpStatus.internalServerError);

//   return response;
// };

// const getAlbumByIdHandler = (request, h) => {
//   const {
//     id,
//   } = request.params;

//   const albums = musics.filter((album) => album.id === id)[0];

//   if (albums !== undefined) {
//     return {
//       status: 'success',
//       data: {
//         album: albums,
//       },
//     };
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Album tidak ditemukan',
//   });
//   response.code(httpStatus.notFound);

//   return response;
// };

// const editAlbumByIdHandler = (request, h) => {
//   const {
//     id,
//   } = request.params;

//   const {
//     name,
//     year,
//   } = request.payload;

//   const index = musics.findIndex((album) => album.id === id);

//   if (index !== -1) {
//     if (name === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan album. Mohon isi name album',
//       });
//       response.code(httpStatus.badRequest);
  
//       return response;
//     }
  
//     if (year === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan album. Mohon isi year album',
//       });
//       response.code(httpStatus.badRequest);
  
//       return response;
//     }
  
//     if (typeof year !== 'number') {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan album. Year harus berupa angka',
//       });
//       response.code(httpStatus.BAD_REQUEST);
//       return response;
//     }

//     musics[index] = {
//       ...musics[index],
//       name,
//       year,
//     };

//     const response = h.response({
//       status: 'success',
//       message: 'Album berhasil diperbarui',
//     });
//     response.code(httpStatus.success);

//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Gagal memperbarui album Id tidak ditemukan',
//   });
//   response.code(httpStatus.notFound);

//   return response;
// };

// const deleteAlbumByIdHandler = (request, h) => {
//   const {
//     id,
//   } = request.params;

//   const index = musics.findIndex((album) => album.id === id);

//   if (index !== -1) {
//     musics.splice(index, 1);
//     const response = h.response({
//       status: 'success',
//       message: 'Album berhasil dihapus',
//     });
//     response.code(httpStatus.success);

//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Album gagal dihapus Id tidak ditemukan',
//   });
//   response.code(httpStatus.notFound);

//   return response;
// };

// // Song
// const addSongHandler = (request, h) => {
//   const {
//     title,
//     year,
//     genre,
//     performer,
//     duration,
//     albumId,
//   } = request.payload;

//   if (title === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan song. Mohon isi title album',
//     });
//     response.code(httpStatus.badRequest);

//     return response;
//   }

//   if (year === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan song. Mohon isi year album',
//     });
//     response.code(httpStatus.badRequest);

//     return response;
//   }

//   if (typeof year !== 'number') {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan song. Year harus berupa angka',
//     });
//     response.code(httpStatus.badRequest);
//     return response;
//   }

//   if (genre === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan song. Mohon isi genre album',
//     });
//     response.code(httpStatus.badRequest);

//     return response;
//   }

//   if (performer === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan song. Mohon isi performer album',
//     });
//     response.code(httpStatus.badRequest);

//     return response;
//   }

//   const id = nanoid(16);

//   const songs = {
//     id,
//     title,
//     year,
//     performer,
//     genre,
//     duration,
//     albumId,
//   };

//   musics.push(songs);

//   const isSuccess = musics.filter((song) => song.id === id).length > 0;

//   if (isSuccess) {
//     const response = h.response({
//       status: 'success',
//       message: 'Song berhasil ditambahkan',
//       data: {
//         songId: id,
//       },
//     });
//     response.code(httpStatus.created);

//     return response;
//   }

//   const response = h.response({
//     status: 'error',
//     message: 'Song gagal ditambahkan',
//   });
//   response.code(httpStatus.internalServerError);

//   return response;
// };

// const getAllSongHandler = (request, h) => {
//   const {
//     title,
//     performer,
//   } = request.query;

//   let filteredMusics = musics;

//   if (title !== undefined) {
//     filteredMusics = filteredMusics.filter((song) => song
//       .title.toLowerCase().includes(title.toLowerCase()));
//   }

//   if (performer !== undefined) {
//     filteredMusics = filteredMusics.filter((song) => song
//       .performer.toLowerCase().includes(performer.toLowerCase()));
//   }

//   const filteredMusicsResponse = filteredMusics.map((song) => ({
//     id: song.id,
//     title: song.title,
//     performer: song.performer,
//   }));

//   const response = h.response({
//     status: 'success',
//     data: {
//       songs: filteredMusicsResponse,
//     },
//   });
//   response.code(httpStatus.success);

//   return response;
// };

// const getSongByIdHandler = (request, h) => {
//   const {
//     id,
//   } = request.params;

//   const songs = musics.filter((song) => song.id === id)[0];

//   if (songs !== undefined) {
//     return {
//       status: 'success',
//       data: {
//         songs,
//       },
//     };
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Song tidak ditemukan',
//   });
//   response.code(httpStatus.notFound);

//   return response;
// };

// const editSongByIdHandler = (request, h) => {
//   const {
//     id,
//   } = request.params;

//   const {
//     title,
//     year,
//     genre,
//     performer,
//     duration,
//     albumId,
//   } = request.payload

//   const index = musics.findIndex((song) => song.id === id);

//   if (index !== -1) {
//     if (title === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan song. Mohon isi title album',
//       });
//       response.code(httpStatus.badRequest);
  
//       return response;
//     }
  
//     if (year === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan song. Mohon isi year album',
//       });
//       response.code(httpStatus.badRequest);
  
//       return response;
//     }
  
//     if (genre === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan song. Mohon isi genre album',
//       });
//       response.code(httpStatus.badRequest);
  
//       return response;
//     }
  
//     if (performer === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal menambahkan song. Mohon isi performer album',
//       });
//       response.code(httpStatus.badRequest);
  
//       return response;
//     }

//     musics[index] = {
//       ...musics[index],
//       title,
//       year,
//       genre,
//       performer,
//       duration,
//       albumId,
//     };

//     const response = h.response({
//       status: 'success',
//       message: 'Song berhasil diperbarui',
//     });
//     response.code(httpStatus.success);

//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Gagal memperbarui buku. Id tidak ditemukan',
//   });
//   response.code(httpStatus.notFound);

//   return response;
// };

// const deleteSongByIdHandler = (request, h) => {
//   const {
//     id,
//   } = request.params;

//   const index = musics.findIndex((song) => song.id === id);

//   if (index !== -1) {
//     musics.splice(index, 1);
//     const response = h.response({
//       status: 'success',
//       message: 'Song berhasil dihapus',
//     });
//     response.code(httpStatus.success);

//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Song gagal dihapus. Id tidak ditemukan',
//   });
//   response.code(httpStatus.notFound);

//   return response;
// };

// export {
//   addAlbumHandler,
//   getAlbumByIdHandler,
//   editAlbumByIdHandler,
//   deleteAlbumByIdHandler,

//   // Song
//   addSongHandler,
//   getAllSongHandler,
//   getSongByIdHandler,
//   editSongByIdHandler,
//   deleteSongByIdHandler,
// };
