const prisma = require('../config/db');

const recipeModel = {
  findRecipes: async () => {
    const recipe = await prisma.recipe.findMany();
    return recipe;
  },

  findIdRecipe: async (id) => {
    const recipe = await prisma.recipe.findFirst({
      // eslint-disable-next-line no-undef
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
      where: id,
    });
    return recipe;
  },
};

module.exports = recipeModel;
