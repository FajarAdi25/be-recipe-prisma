/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
const { compareSync } = require("bcrypt");
const { response, responseError } = require("../utils/response");
const {
  findEmail,
  createUser,
  findUsers,
  findIdUser,
  updateUser,
  destroyUser,
  uploadImageProfile,
  destroyImageProfile,
} = require("../models/userModel");
const { generateToken, refreshToken } = require("../config/jwt");
const extractString = require("../utils/extractString");
const redis = require("../config/redisConfig");

const userController = {
  allUsers: async (req, res) => {
    try {
      const users = await findUsers();
      response(res, users, 200, "get all data successful");
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  getUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await findIdUser(Number(id));
      response(res, user, 200, "get data user by id successful");
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  register: async (req, res) => {
    try {
      const newUserData = req.body;
      const user = await findEmail(newUserData.email);
      // console.log(newUserData);
      if (user) {
        throw new Error("user already exists");
      } else if (newUserData.password !== newUserData.confirmPassword) {
        throw new Error("password invalid");
      }
      const userData = await createUser(newUserData);
      response(res, userData, 201, "create user successful");
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  login: async (req, res) => {
    try {
      const userData = req.body;
      const user = await findEmail(userData.email);
      // console.log(user.password);
      if (!user) {
        throw new Error("user doesnt exists");
      } else if (!compareSync(userData.password, user.password)) {
        throw new Error("incorrect password");
      }

      delete user.password;
      delete user.confirmpassword;
      const payload = {
        user,
      };
      user.token = generateToken(payload);
      const reaccessToken = refreshToken(payload);
      user.reaccessToken = reaccessToken;

      return response(res, user, 200, "login success");
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await findIdUser(Number(id));
      if (!user) {
        throw new Error("user not found");
      }

      const profilImage = await uploadImageProfile(req.file);

      const formUserData = req.body;
      const userData = {
        username: formUserData.username || user.username,
        phone: formUserData.phone || user.phone,
        image: profilImage.secure_url || user.image,
      };

      const newUserData = await updateUser(Number(id), userData);
      // console.log(newUserData);
      response(res, newUserData, 200, "update user successful");
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await findIdUser(Number(id));
      if (!user) {
        throw new Error("user not found");
      }

      const imageSubstring = extractString(user.image);
      const deleteData = await destroyUser(Number(id));
      await destroyImageProfile(imageSubstring);
      response(res, deleteData, 200, "delete successful");
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  getUserByIdRedis: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await findIdUser(Number(id));
      const dataRedis = redis.set(
        `getFromRedis/${id}`,
        JSON.stringify(result),
        { EX: 180, NX: true }
      );
      res.json({
        fromCache: false,
        data: dataRedis,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error getting user",
      });
    }
  },
};

module.exports = userController;
