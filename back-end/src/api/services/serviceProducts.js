const model = require('../../database/models/index');

const getAllProducts = async () => {
  const products = await model.product.findAll();
  return products;
};

module.exports = {
  getAllProducts,
};
