const serviceOrders = require('../services/serviceOrders');

const getAllSales = async (req, res) => {
  try {
    const sales = await serviceOrders.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const getSaleById = await serviceOrders.getSaleById(id);

    return res.status(200).json(getSaleById);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

const createNewOrder = async (req, res, _next) => {
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
  getAllSales,
  getSaleById,
};