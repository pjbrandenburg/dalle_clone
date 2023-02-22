import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();    // Populate environment variables

const router = express.Router();

// demo route
router.route('/').get((req, res) => {
    res.send('Hello from DALL-E')
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Get all posts
router.route('/').get(async(req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts})
    } catch (error) {
        res.status(500).json({ success: false, message: error})
    }
});

// Create a Post
router.route('/').post(async(req, res) => {
    try {
        const { name, prompt, photo } = req.body                    // Receive data from front end
        const photoUrl = await cloudinary.uploader.upload(photo)    // Upload to cloudinary and receive url
    
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,                                    // Only share the URL
        })
    
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
});

export default router;