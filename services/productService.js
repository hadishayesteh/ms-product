const Product = require('../models/Product');
const _ = require('lodash')

async function getProducts(queryParams) {
  try {
    const result = Product.find({...queryParams});
    if (_.isNull(result)) {
      return {
        type: 'notFound',
        statusCode: 204,
      }
    }
    return result
  } catch (err) {
    throw err;
  }
}

async function getProduct(productId) {
  try {
    const result = await Product.findOne({_id: productId});
    if (_.isNull(result)) {
      return {
        type: 'error',
        statusCode: 404,
        errorType: 'ResourceNotFound',
        errorMessage: `product with id ${productId} is not found`
      }
    }
    return result
  } catch (err) {
    throw err;
  }
}

async function createProduct(payload) {
  try {
    const newProduct = new Product(payload);
    if (!_.isNull(newProduct.parentId)) {
      const product = await Product.findById({_id: payload.parentId})
      if (_.isNull(product)) {
        return {
          type: 'error',
          statusCode: 404,
          errorType: 'ResourceNotFound',
          errorMessage: `Parent with id ${newProduct.parentId} is not found`
        }
      }
      if(product && !_.isNull(product.parentId)) {
        return {
          statusCode: 400,
          type: 'error',
          errorType: 'ResourceNotFound',
          errorMessage: `${product._id} is a child and cannot be a parent`
        }
      }
    }
    return await newProduct.save();
  } catch (err) {
    throw err;
  }
}

async function updateProduct(productId, payload) {
  try {
    const product = await Product.findById({_id: productId})
    if (_.isNull(product)) {
      return {
        type: 'error',
        statusCode: 404,
        errorType: 'ResourceNotFound',
        errorMessage: `Product with id ${newProduct.parentId} is not found`
      }
    }
    if(payload.parentId) {
      const parentProduct = await Product.findById({_id: payload.parentId})
      if (_.isNull(parentProduct)) {
        return {
          type: 'error',
          statusCode: 404,
          errorType: 'ResourceNotFound',
          errorMessage: `parentProduct with id ${payload.parentId} is not found`
        }
      }
      if(parentProduct && parentProduct.parentId) {
        return {
          statusCode: 400,
          type: 'error',
          errorType: 'ResourceNotFound',
          errorMessage: `${payload.parentId} is a child and cannot be a parent`
        }
      }
    }
    return await _updateObject(payload, product).save()
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(productId) {
  try {
    return Product.deleteOne({id: productId});
  } catch (err) {
    throw err;
  }
}

function _updateObject (src, dest) {
  function recursiveFunc (src, dest) {
    _.forOwn(src, function (value, key) {
      if(_.isObject(value) && _.keys(value).length !== 0) {
        dest[key] = dest[key] || {};
        recursiveFunc(src[key], dest[key])
      } else if (_.isArray(src) && !_.isObject(src[key])) {
        dest.set(key, value);
      } else {
        dest[key] = value;
      }
    });
  }
  recursiveFunc(src, dest);
  return dest;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
