import mongoose from "mongoose";
const commentsSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        username: {type:String, required: true},
        role: {type:String, default: "user"},
        trackId: {type:String, required: true},
        trackName: {type:String, required: true},
        comment: { type: String},
        createdAt: { type: Date, default: Date.now },
    },
    { collection: "comments" }
);
export default commentsSchema;