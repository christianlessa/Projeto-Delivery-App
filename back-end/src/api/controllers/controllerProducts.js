const serviceProduct = require('../services/serviceProducts');

const getAllProduct = async (_req, res, next) => {
  try {
    const products = await serviceProduct.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getAllProduct,
};
