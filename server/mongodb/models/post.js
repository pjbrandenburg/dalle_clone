import mongoose from 'mongoose';

// Schemas
const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
})

// Models
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;