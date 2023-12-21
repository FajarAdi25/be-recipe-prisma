/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
const { response, responseError } = require('../utils/response');
const {
  updateRecipe, findIdRecipe, findRecipes, createRecipe, destroyRecipe, uploadImageRecipe, uploadVideoRecipe, destroyImageAndVideo, findSortAndPaginate,
} = require('../models/recipeModel');

// const cloudinary = require('../config/cloudinaryConfig');
const extractString = require('../utils/extractString');

const recipeController = {
  allRecipes: async (req, res) => {
    try {
      const recipes = await findRecipes();
      response(res, recipes, 200, 'get all data successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  searchSortPaginateRecipe: async (req, res) => {
    try {
      const { query } = req;
      const newQuery = {
        search: query.search || '',
        sort: query.sort || 'ASC',
        take: Number(query.take) || 10,
        skip: Number(query.skip) || 0,
      };
      const result = await findSortAndPaginate(newQuery);
      response(res, result, 200, 'get data successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  addRecipe: async (req, res) => {
    try {
      const recipeImage = await uploadImageRecipe(req.files.image);
      const recipeVideo = await uploadVideoRecipe(req.files.video);

      const recipeFormData = req.body;

      const newRecipeData = {
        title: recipeFormData.title,
        ingredients: recipeFormData.ingredients,
        image: recipeImage.secure_url,
        videoName: recipeFormData.videoName,
        video: recipeVideo.secure_url,
      };

      for (const key in newRecipeData) {
        if (!newRecipeData[key]) {
          throw new Error('Some fields are blank');
        }
      }

      const recipeData = await createRecipe(newRecipeData);
      response(res, recipeData, 201, 'Created data successfully');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  editRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await findIdRecipe(Number(id));
      if (!recipe) {
        throw new Error('recipe not found');
      }

      const recipeImage = await uploadImageRecipe(req.files.image);
      const recipeVideo = await uploadVideoRecipe(req.files.video);
      const recipeFormData = req.body;
      const recipeData = {
        title: recipeFormData.title || recipe.title,
        ingredients: recipeFormData.ingredients || recipe.ingredients,
        image: recipeImage.secure_url || recipe.image,
        videoName: recipeFormData.videoName || recipe.videoName,
        video: recipeVideo.secure_url || recipe.video,
      };

      const newRecipeData = await updateRecipe(Number(id), recipeData);
      response(res, newRecipeData, 200, 'recipe update successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.params;

      const recipe = await findIdRecipe(Number(id));

      const imageSubstring = extractString(recipe.image);
      const videoSubstring = extractString(recipe.video);

      const deleteRecipe = await destroyRecipe(Number(id));
      // console.log(recipe);
      await destroyImageAndVideo(imageSubstring, videoSubstring);
      // console.log(imageSubstring);
      // console.log(videoSubstring);
      response(res, deleteRecipe, 200, 'delete recipe successfull');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },
};
module.exports = recipeController;
