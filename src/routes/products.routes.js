const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

router.post('/products', productController.createProduct);

router.get('/products/:id', productController.findProductById);

router.delete('/products/:id', productController.deleteProductById);

router.get('/products', productController.findAllProducts);

router.put('/products/:id', productController.updateProduct);

module.exports = router;