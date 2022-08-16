const { getSellerSales, updateStatus } = require('../services/serviceSellers');

const getSellerOrders = async (req, res, next) => {
  try {
    const { sellerId } = req.body;
    const sellerSales = await getSellerSales(sellerId);
    
    return res.status(200).json(sellerSales);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const appResponse = await updateStatus(orderId, status);
    
    return res.status(200).json(appResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellerOrders,
  updateOrderStatus,
};
