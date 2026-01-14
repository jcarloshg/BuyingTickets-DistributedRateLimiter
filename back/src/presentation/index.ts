import express from "express";
import { createAuthRoutes } from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

createAuthRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
