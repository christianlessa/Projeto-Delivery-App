const { sale } = require('../../database/models');

const getSellerSales = async (id) => {
  const sellerSales = await sale.findAll({ where: { sellerId: id } });

  if (sellerSales.length === 0) throw new Error('SaleNotFound');

  return sellerSales;
};

module.exports = {
  getSellerSales,
};
