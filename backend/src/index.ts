import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tradeRoutes from './routes/trades';
import insightRoutes from './routes/insights';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/trades', tradeRoutes);

app.use('/api/insights', insightRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ExcelLens backend running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ExcelLens backend running on port ${PORT}`);
});