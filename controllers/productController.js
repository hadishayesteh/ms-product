const { productService } = require('../services');

async function getProducts(request, response) {
  const queryParams = request.query;
  const result  = await productService.getProducts(queryParams);
  if(result.type && result.type === 'notFound') {
    response.statusCode = result.statusCode;
  }
  response.json(result);
}

async function getProduct(request, response) {
  const productId = request.params.productId;
  const result  = await productService.getProduct(productId);
  if (result.type && result.type === 'error') {
    response.statusCode = result.statusCode;
  }
  response.json(result);
}

async function createProduct(request, response) {
  const payload = request.body;
  const result  = await productService.createProduct(payload);
  if (result.type && result.type === 'error') {
    response.statusCode = result.statusCode;
  }
  response.statusCode = 201;
  response.json(result);
}

async function deleteProduct(request, response) {
  const productId = request.params.productId;
  const result  = await productService.deleteProduct(productId);
  if (result.type && result.type === 'error') {
    response.statusCode = result.statusCode;
  }
  response.json(result);
}

async function updateProduct(request, response) {
  const productId = request.params.productId;
  const payload = request.body;
  const result  = await productService.updateProduct(productId, payload);
  if (result.type && result.type === 'error') {
    response.statusCode = result.statusCode;
  }
  response.json(result);
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
}
