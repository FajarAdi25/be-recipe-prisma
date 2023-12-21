/* eslint-disable consistent-return */
const path = require('path');
const multer = require('multer');
const { responseError } = require('../utils/response');

const multerStorage = multer.diskStorage({
  destination: './public',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const imageExtensions = ['.png', '.jpg', '.jpeg'];
    const videoExtensions = ['.3gp', '.mpeg', '.mp4'];
    const maxSizeImage = 2 * 1024 * 1024;
    const maxSizeVideo = 50 * 1024 * 1024;

    if (file.fieldname === 'image') {
      if (imageExtensions.includes(ext)) {
        if (file.size > maxSizeImage) {
          return cb({ message: 'File size should be less than 2MB' }, false);
        }
        return cb(null, true);
      }
      return cb({ message: 'File must be a .PNG, .JPG, or .JPEG' }, false);
    }
    if (file.fieldname === 'video') {
      if (videoExtensions.includes(ext)) {
        if (file.size > maxSizeVideo) {
          return cb({ message: 'File size exceeds 50 MB' }, false);
        }
        return cb(null, true);
      }
      return cb({ message: 'File must be mp4 or mpeg' }, false);
    }
  },
});

const uploadImageAndVideoRecipe = (req, res, next) => {
  const multerFields = multerUpload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]);

  multerFields(req, res, (err) => {
    if (err) {
      return responseError(res, 413, err.message);
    }
    next();
  });
};

module.exports = { uploadImageAndVideoRecipe };
