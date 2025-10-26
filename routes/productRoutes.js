const express = require('express');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();

// Add product
router.post('/add-product/:firmId', productController.addProduct);

// Get all products for a firm
router.get('/:firmId/products', productController.getProductByFirm);

// Serve uploaded images
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '..', 'uploads', imageName);
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Image not found' });
    }
  });
});

// Delete a product by ID
router.delete('/:productId', productController.deleteProductById);

module.exports = router;
