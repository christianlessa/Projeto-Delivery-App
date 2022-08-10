const serviceOrders = require('../services/serviceOrders');

const createNewOrder = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const data = req.body;
    const newOrder = await serviceOrders.createNewOrder(userId, data);
    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewOrder,
};