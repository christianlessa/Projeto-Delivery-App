const serviceSellers = require('../services/serviceSellers');

const getSellerSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sellerSales = await serviceSellers.getSellerSales(id);
    
    return res.status(200).json(sellerSales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellerSales,
};
