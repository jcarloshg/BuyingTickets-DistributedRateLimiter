import express from 'express';
import { createAuthRoutes } from './presentation/routes/authRoutes';

const app = express();
app.use(express.json());
createAuthRoutes(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hello, server running on: ${PORT}`);
});
