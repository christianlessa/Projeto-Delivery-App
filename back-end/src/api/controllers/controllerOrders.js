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

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    await serviceOrders.updateStatus(id);
    
    return res.status(200).json({ message: 'Status atualizado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewOrder,
  getAllSales,
  getSaleById,
  updateStatus,
};