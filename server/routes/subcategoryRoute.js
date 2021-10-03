const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddleware');

// controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/subcategoryController');

// routes
router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategory', list);
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.delete('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
