const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    brand: {
      type: String,
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      default: null
    },
    properties: {
      type: Object,
      required: false
    }
  },
  {
    collection: 'Product'
  }
);

module.exports = mongoose.model('Product', ProductSchema);
