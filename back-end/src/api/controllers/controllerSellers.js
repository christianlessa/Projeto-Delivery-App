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

const updateStatus = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const appResponse = await serviceSellers.updateStatus(orderId, status);
    
    return res.status(200).json(appResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellerSales,
  updateStatus,
};
