import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err.message || 'Internal error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
