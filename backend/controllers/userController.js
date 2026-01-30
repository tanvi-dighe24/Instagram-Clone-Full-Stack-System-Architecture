const db = require('../config/db');

// Follow a User
exports.followUser = async (req, res) => {
    const { followingId } = req.body; // Person you want to follow
    const followerId = req.user.id;   // You (from JWT)

    try {
        if (followerId === parseInt(followingId)) {
            return res.status(400).json({ msg: "You cannot follow yourself" });
        }

        await db.query(
            'INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)',
            [followerId, followingId]
        );
        res.json({ msg: "Successfully followed user" });
    } catch (err) {
        res.status(400).json({ msg: "Already following this user" });
    }
};