import express from 'express';
import { products, Product } from '../database/models/Product';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all products
router.get('/', (_req, res) => {
  res.json(products);
});

// Get a product by ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Create a new product
router.post('/', (req, res) => {
  const newProduct: Product = {
    id: uuidv4(),
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
router.put('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Delete a product
router.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;