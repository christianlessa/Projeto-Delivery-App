const serviceOrders = require('../services/serviceOrders');

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await serviceOrders.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await serviceOrders.getSaleById(id);

    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

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

const getAllOrderByUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const serviceResponse = await serviceOrders.getAllByUserId(userId);
    return res.status(200).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewOrder,
  getAllSales,
  getSaleById,
  getAllOrderByUserId,
};