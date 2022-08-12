const { sale } = require('../../database/models');

const getSellerSales = async (id) => {
  const sellerSales = await sale.findAll({ where: { sellerId: id } });

  if (sellerSales.length === 0) throw new Error('SaleNotFound');

  return sellerSales;
};

const updateStatus = async (id, status) => {
  const [updateSale] = await sale.update(
    { status },
    { where: { id } },
  );

  if (!updateSale) throw new Error('SaleNotFound');
};

module.exports = {
  getSellerSales,
  updateStatus,
};
