const serviceProduct = require('../services/serviceProducts');

const getAllProduct = async (_req, res, _next) => {
  try {
    const products = await serviceProduct.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getAllProduct,
};