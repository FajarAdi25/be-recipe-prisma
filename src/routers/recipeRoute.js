const express = require('express');
const {
  // eslint-disable-next-line max-len
  allRecipes, addRecipe, editRecipe, deleteRecipe, searchSortPaginateRecipe, recipeByUserId, recipeById,
} = require('../controllers/recipeController');
const { uploadImageAndVideoRecipe } = require('../middlewares/multerRecipe');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/verifyRole');

const router = express.Router();

router.get('/recipe', authMiddleware, isAdmin, allRecipes);
router.get('/searchRecipe', authMiddleware, isAdmin, searchSortPaginateRecipe);
router.get('/recipe/:id', authMiddleware, isAdmin, recipeById);
router.post('/recipe', authMiddleware, isAdmin, uploadImageAndVideoRecipe, addRecipe);
router.put('/recipe/:id', authMiddleware, isAdmin, uploadImageAndVideoRecipe, editRecipe);
router.delete('/recipe/:id', authMiddleware, isAdmin, deleteRecipe);
router.get('/recipe/user/:id', authMiddleware, isAdmin, recipeByUserId);

module.exports = router;
