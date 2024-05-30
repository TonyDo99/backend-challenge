import express from 'express';
import cors from 'cors';
import { PORT } from './config/index.js';
import gameRoutes from './routes/game.route.js';
import authRoutes from './routes/auth.route.js';
import { swaggerUi, swaggerDocs } from './swagger/index.js';
import { authenticateToken } from './middlewares/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/game', authenticateToken, gameRoutes);
app.use('/auth', authRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
