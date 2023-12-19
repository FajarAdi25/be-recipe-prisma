const { response, responseError } = require('../helpers/response');
const { updateRecipe, findIdRecipe } = require('../models/recipeModel');

const recipeController = {
  editRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await findIdRecipe(Number(id));
      if (!recipe) {
        throw new Error('recipe not found');
      }
      const recipeData = req.body;
      const formRecipeData = {
        title: recipeData.title || recipe.title,
        ingredients: recipeData.ingredients || recipe.ingredients,
        image: recipeData.image || recipe.image,
        videoName: recipeData.videoName || recipe.videoName,
        video: recipeData.video || recipe.video,
      };
      const newRecipeData = await updateRecipe(formRecipeData);
      response(res, newRecipeData, 200, 'recipe update successful');
    } catch (error) {
      responseError(res, 400, error.message);
    }
  },
};
module.exports = recipeController;
