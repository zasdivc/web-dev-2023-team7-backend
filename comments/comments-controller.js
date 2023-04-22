import * as commentsDao from "../comments/comments-dao.js";

function CommentsController(app) {
    const findAllComments = async (req, res) => {
        const comments = await commentsDao.findAllComments();
        res.json(comments);
    };

    const findCommentsByTrackId = async (req, res) => {
        const comments = await commentsDao.findCommentsByTrackId(req.params.trackId);
        res.json(comments);
    }

    const findCommentsByUserId = async (req, res) => {
        const userId = req.params.userId;
        const comments = await commentsDao.findCommentsByUserId(userId);
        res.send(comments);
    };
    const createComment = async (req, res) => {
        const comment = req.body;
        const newComment = await commentsDao.createComment(comment);
        res.json(newComment);
    };
    const deleteComment = async (req, res) => {
        const commentId = req.params.commentId;
        const status = await commentsDao.deleteComment(commentId);
        res.send(status);
    };

    app.get("/api/comments", findAllComments);
    app.get("/api/comments/track/:trackId", findCommentsByTrackId);
    app.get("/api/comments/user/:userId", findCommentsByUserId);
    app.post("/api/comments", createComment);
    app.delete("/api/comments/:commentId", deleteComment);
}

export default CommentsController;
