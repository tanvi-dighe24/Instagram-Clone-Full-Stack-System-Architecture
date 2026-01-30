const db = require('../config/db');

// 1. Create a Post
exports.uploadPost = async (req, res) => {
    const { image_url, caption } = req.body;
    const userId = req.user.id; // Comes from JWT middleware
    try {
        const result = await db.query(
            'INSERT INTO posts (user_id, image_url, caption) VALUES ($1, $2, $3) RETURNING *',
            [userId, image_url, caption]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// 2. Like a Post (The Logic MNCs love)
exports.likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    try {
        // Add to likes table
        await db.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [userId, postId]);
        // Increment count in posts table
        await db.query('UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1', [postId]);
        
        res.json({ message: "Post Liked!" });
    } catch (err) {
        res.status(400).json({ error: "Already liked or error" });
    }
};