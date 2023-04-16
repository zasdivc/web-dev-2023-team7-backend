import commentsModel from "./comments-model.js";

export const findAllComments = async () => {
    return commentsModel.find();
};

export const findCommentsByTrackId = async (trackId) => {
    return commentsModel.find({trackId: trackId});
};

export const findCommentsByUserId = async (userId) => {
    return commentsModel.find({user: userId});
};

export const createComment = async (comment) => {
    return commentsModel.create(comment);
};

export const deleteComment = async (commentId) => {
    return commentsModel.deleteOne({_id: commentId});
};
