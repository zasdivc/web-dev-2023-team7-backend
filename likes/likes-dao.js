import likesModel from "./likes-model.js";

export const findLikesByUserId = async (userId) => {
    return likesModel.find({user: userId});
}

export const findLikesByTrackIdAndUserId = async (trackId, userId) => {
    return likesModel.find({user: userId, trackId: trackId});
}

export const createLike = async (like) => {
    return likesModel.create(like);
}

export const deleteLike = async (likeId) => {
    return likesModel.deleteOne({_id: likeId});
}