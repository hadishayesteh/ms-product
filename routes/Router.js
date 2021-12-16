const Router = require('express-promise-router');
const accessPointController = require('../controllers/productController');
const router = new Router();

router.get('/product', accessPointController.getProducts);
router.post('/product', accessPointController.createProduct);

router.get('/product/:productId', accessPointController.getProduct);
router.delete('/product/:productId', accessPointController.deleteProduct);
router.put('/product/:productId', accessPointController.updateProduct);

module.exports = router;
