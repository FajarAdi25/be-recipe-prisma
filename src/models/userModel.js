/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require("bcrypt");
const prisma = require("../config/db");
const cloudinary = require("../config/cloudinaryConfig");

const userModel = {
  findUsers: async () => {
    const user = await prisma.user.findMany();
    return user;
  },

  findEmail: async (email) => {
    const user = await prisma.user.findFirst({
      // eslint-disable-next-line no-undef
      where: { email },
    });
    return user;
  },

  findIdUser: async (id) => {
    const user = await prisma.user.findFirst({
      // eslint-disable-next-line no-undef
      where: { id },
    });
    return user;
  },

  createUser: async (userData) => {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
        phone: userData.phone,
        image: null,
      },
    });
    return user;
  },

  updateUser: async (id, userData) => {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username: userData.username,
        phone: userData.phone,
        image: userData.image,
      },
    });
    return user;
  },

  destroyUser: async (id) => {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  },

  uploadImageProfile: async (image) => {
    const upload = await cloudinary.uploader.upload(image.path, {
      folder: "/user",
      // resource_type: 'image',
    });
    return upload;
  },

  destroyImageProfile: async (image) => {
    const destroy = await cloudinary.uploader.destroy(image);
    return destroy;
  },
};

module.exports = userModel;
