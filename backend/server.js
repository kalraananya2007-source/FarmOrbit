import cropRoutes from './routes/tempRoutes.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/crops', cropRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FarmOrbit backend is running!'
  });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`FarmOrbit backend running at http://localhost:${PORT}`);
  });
}

startServer();
