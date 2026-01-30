const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth'); // Protects the routes

router.post('/upload', auth, postController.uploadPost);
router.post('/like/:postId', auth, postController.likePost);

module.exports = router;