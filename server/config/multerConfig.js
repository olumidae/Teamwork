// import multer from 'multer';

// // multer.diskStorage() creates a storage space for storing FileList.

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     if (file.mimetype === 'image/gif') {
//       cb(null, './files/images/');
//     } else {
//       cb({ message: 'this file is not an image file' }, false);
//     }
//   },

//   filename(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;
