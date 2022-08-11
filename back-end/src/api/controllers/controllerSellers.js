const serviceSellers = require('../services/serviceSellers');

const getIdSales = async (_req, res, _next) => {
  try {
    const sales = await serviceSellers.getIdSales();
    
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getIdSales,
};