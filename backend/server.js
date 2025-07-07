import cors from 'cors';
import express from 'express';
import initWebRoutes from './route/web.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});