const { assert } = require('chai')
const sinon = require('sinon')
const Product = require('../../models/Product')
const ProductService = require('../../services/productService')

describe('ProductService test scenarios', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('createProduct test scenarios', () => {
    /**
     * Test success creation product record with no parentId
     *
     * @covers services/ProductService.createProduct
     */
    it('success creation', async () => {
      const productRecord = {
        brand: "shikes",
        parentId: null,
        properties: {
          name: "cool shirt",
          price: "free"
        },
        _id: "61bbae8be991137602d6a408",
        __v: 0
      };
      const payload = {
        brand: "Shike",
        properties: {
          name: 'cool shirt',
          price: 'free'
        }
      }
      sandbox.stub(Product.prototype, 'save').callsFake(() => productRecord);
      const result = await ProductService.createProduct(payload);
      assert.deepEqual(
        result,
        productRecord,
        'Incorrect result object was returned',
      );
    });

    it('Test the successful creation of product when there is a valid parentId passed');
    it('Test the error scenario when the parentId is invalid or no parent record can be found for the id');
    it('Test the error scenario when the given parentId is for a child product');

  });

});
