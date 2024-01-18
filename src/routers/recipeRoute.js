/* eslint-disable linebreak-style */
const express = require('express');
const {
  // eslint-disable-next-line max-len
  allRecipes, addRecipe, editRecipe, deleteRecipe, searchSortPaginateRecipe, recipeByUserId, recipeById,
} = require('../controllers/recipeController');
const { uploadImageAndVideoRecipe } = require('../middlewares/multerRecipe');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/verifyRole');

const router = express.Router();

router.get('/', authMiddleware, allRecipes);
router.get('/recipe', authMiddleware, searchSortPaginateRecipe);
router.get('/recipe/:id', authMiddleware, recipeById);
router.post('/recipe', authMiddleware, isAdmin, uploadImageAndVideoRecipe, addRecipe);
router.put('/recipe/:id', authMiddleware, isAdmin, uploadImageAndVideoRecipe, editRecipe);
router.delete('/recipe/:id', authMiddleware, isAdmin, deleteRecipe);
router.get('/recipe/user/:id', authMiddleware, isAdmin, recipeByUserId);

module.exports = router;
