import * as likesDao from "../likes/likes-dao.js";

function LikesController(app) {
    const findLikesByUserId = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const likes = await likesDao.findLikesByUserId(currentUser._id);
        res.json(likes);
    }

    const findLikesByTrackIdAndUserId = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const trackId = req.params.trackId;
        const likes = await likesDao.findLikesByTrackIdAndUserId(trackId, currentUser._id);
        res.json(likes);
    }
    const createLike = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(403);
            return;
        }
        const like = { ...req.body, user: currentUser._id };
        const newLike = await likesDao.createLike(like);
        res.json(newLike);
    };
    const deleteLike = async (req, res) => {
        const likeId = req.params.likeId;
        const status = await likesDao.deleteLike(likeId);
        res.send(status);
    };

    app.get("api/likes/user/:userId", findLikesByUserId);
    app.get("/api/likes/track/:trackId/:userId", findLikesByTrackIdAndUserId);
    app.post("/api/likes", createLike);
    app.delete("/api/likes/:likeId", deleteLike);
}

export default LikesController;
