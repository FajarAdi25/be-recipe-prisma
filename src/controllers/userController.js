/* eslint-disable import/no-extraneous-dependencies */
const { compareSync } = require('bcrypt');
const { response, responseError } = require('../helpers/response');
const {
  findEmail, createUser, findUsers, findIdUser, updateUser, destroyUser,
} = require('../models/userModel');
const { generateToken } = require('../config/jwt');

const userController = {
  allUser: async (req, res) => {
    try {
      const users = await findUsers();
      response(res, users, 200, 'get all data successful');
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
        throw new Error('user already exists');
      } else if (newUserData.password !== newUserData.confirmPassword) {
        throw new Error('password invalid');
      }
      const userData = await createUser(newUserData);
      response(res, userData, 201, 'create user successful');
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
        throw new Error('user doesnt exists');
      } else if (!compareSync(userData.password, user.password)) {
        throw new Error('incorrect password');
      }
      const token = generateToken({
        userId: user.id,
      });
      response(res, { user, token }, 200, 'login successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  me: async (req, res) => {
    try {
      const { userId } = req.payload;
      // console.log(id);
      const result = await findIdUser(userId);
      response(res, result, 200, 'authorized');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await findIdUser(Number(id));
      if (!user) {
        throw new Error('user not found');
      }
      const userData = req.body;
      const formUserData = {
        username: userData.username || user.username,
        phone: userData.phone || user.phone,
        image: userData.image || user.image,
      };
      const newUserData = await updateUser(Number(id), formUserData);
      // console.log(newUserData);
      response(res, newUserData, 200, 'update user successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await findIdUser(Number(id));
      if (!user) {
        throw new Error('user not found');
      }
      const deleteData = await destroyUser(Number(id));
      response(res, deleteData, 200, 'delete successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },
};

module.exports = userController;
