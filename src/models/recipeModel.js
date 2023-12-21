/* eslint-disable consistent-return */
const prisma = require('../config/db');
const cloudinary = require('../config/cloudinaryConfig');

const recipeModel = {
  findRecipes: async () => {
    const recipe = await prisma.recipe.findMany();
    return recipe;
  },

  findSortAndPaginate: async (query) => {
    const recipe = await prisma.recipe.findMany({
      where: {
        title: {
          contains: query.search,
          mode: 'insensitive', // ILIKE behavior
        },
      },
      orderBy: {
        title: query.sort.toLowerCase(), // Assuming query.sort is 'ASC' or 'DESC'
      },
      take: query.take,
      skip: query.skip,
    });
    return recipe;
  },

  findIdRecipe: async (id) => {
    const recipe = await prisma.recipe.findFirst({
      where: { id },
    });
    return recipe;
  },

  createRecipe: async (recipeData) => {
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        image: recipeData.image,
        videoName: recipeData.videoName,
        video: recipeData.video,
      },
    });
    return recipe;
  },

  updateRecipe: async (id, recipeData) => {
    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        title: recipeData.title,
        image: recipeData.image,
        ingredients: recipeData.ingredients,
        videoName: recipeData.videoName,
        video: recipeData.video,
      },
    });
    return recipe;
  },

  destroyRecipe: async (id) => {
    const recipe = await prisma.recipe.delete({
      where: { id },
    });
    return recipe;
  },

  uploadImageRecipe: async (image) => {
    if (image && image[0]) {
      const upload = await cloudinary.uploader.upload(image[0].path, {
        folder: '/recipe/recipe_image',
        resource_type: 'image',
      });
      return upload;
    }
  },

  uploadVideoRecipe: async (video) => {
    if (video && video[0]) {
      const upload = await cloudinary.uploader.upload(video[0].path, {
        folder: '/recipe/recipe_video',
        resource_type: 'video',
      });
      return upload;
    }
  },

  destroyImageAndVideo: async (image, video) => {
    const destroy = await cloudinary.api.delete_resources([image, video]);
    return destroy;
  },

};

module.exports = recipeModel;
