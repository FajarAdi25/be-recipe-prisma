/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const express = require("express");
const {
  register,
  login,
  editUser,
  deleteUser,
  allUsers,
  getUserId,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadPhotoProfile = require("../middlewares/multerProfile");
const isAdmin = require("../middlewares/verifyRole");
// const hitById = require('../middlewares/redis');

const router = express.Router();

router.get("/user", authMiddleware, isAdmin, allUsers);
router.get("/user/:id", authMiddleware, isAdmin, getUserId);
router.post("/register", register);
router.post("/login", login);
router.put("/user/:id", authMiddleware, isAdmin, uploadPhotoProfile, editUser);
router.delete("/user/:id", authMiddleware, isAdmin, deleteUser);
// router.get('/getFromRedis/:id', hitById, getUserByIdRedis);

module.exports = router;
