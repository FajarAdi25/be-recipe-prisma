const express = require('express');
const {
  allRecipes, addRecipe, editRecipe, deleteRecipe, searchSortPaginateRecipe,
} = require('../controllers/recipeController');
const { uploadImageAndVideoRecipe } = require('../middlewares/multerRecipe');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/verifyRole');

const router = express.Router();

router.get('/recipe', authMiddleware, isAdmin, allRecipes);
router.get('/searchRecipe', authMiddleware, isAdmin, searchSortPaginateRecipe);
router.post('/recipe', authMiddleware, isAdmin, uploadImageAndVideoRecipe, addRecipe);
router.put('/recipe/:id', authMiddleware, isAdmin, uploadImageAndVideoRecipe, editRecipe);
router.delete('/recipe/:id', authMiddleware, isAdmin, deleteRecipe);

module.exports = router;
