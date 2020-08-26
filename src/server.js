import express from 'express';
import initRoutes from './routes';
import connectDB from './config/db';

const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;

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
