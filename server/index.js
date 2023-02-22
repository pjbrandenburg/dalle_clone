import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();                       // Initialize express app
app.use(cors());                             // CORS middleware
app.use(express.json({ limit: '50mb' }))     // middleware with option object

// API endpoints
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Routes
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

// Runs the server
const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }

}

startServer();