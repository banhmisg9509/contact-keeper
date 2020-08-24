import express from 'express';
import initRoutes from './routes';
import connectDB from './config/db';

const app = express();

// Connect DB
connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the contact keeper API',
  });
});

// Define routes
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
