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
    const fileSize = parseInt(req.headers['content-length'], 10);
    const maxSizeImage = 2 * 1024 * 1024;

    if (!imageExtensions.includes(ext)) {
      const errMessage = { message: 'File must be a .PNG, .JPG, or .JPEG' };
      return cb(errMessage, false);
    }

    if (fileSize >= maxSizeImage) {
      const errMessage = { message: 'File size should be less than 2MB' };
      return cb(errMessage, false);
    }

    cb(null, true);
  },
});

const uploadPhotoProfile = (req, res, next) => {
  const multerSingle = multerUpload.single('image');

  multerSingle(req, res, (err) => {
    if (err) {
      return responseError(res, 413, err.message);
    }
    next();
  });
};

module.exports = uploadPhotoProfile;
