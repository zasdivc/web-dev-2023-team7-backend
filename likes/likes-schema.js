import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        trackId: {type:String, required: true},
        trackName: {type:String, required: true},
    },
    { collection: "likes" }
);
export default likesSchema;