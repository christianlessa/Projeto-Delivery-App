const serviceOrders = require('../services/serviceOrders');

const createNewOrder = async (req, res, _next) => {
  try {
    const { id: userId } = req.user;
    const data = req.body;
    const newOrder = await serviceOrders.createNewOrder(userId, data);
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = {
  createNewOrder,
};