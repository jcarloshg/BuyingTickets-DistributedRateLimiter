import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import buyTicketRoutes from './routes/buyTicketRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/ticket', buyTicketRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err.message || 'Internal error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Hello, I'm a server started on port ${PORT}`));
