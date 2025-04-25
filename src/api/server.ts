import express from 'express';
import cors from 'cors';
import productsRouter from './products';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});