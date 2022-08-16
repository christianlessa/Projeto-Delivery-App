const { sale, product } = require('../../database/models');

const getSellerSales = async (sellerId) => {
  const sellerSales = await sale.findAll({
    where: { sellerId },
    include: [
      { model: product, as: 'products' }],
  });

  if (sellerSales.length === 0) throw new Error('SaleNotFound');

  return sellerSales;
};

const updateStatus = async (orderId, status) => {
  const [updateSale] = await sale.update(
    { status },
    { where: { id: orderId } },
  );
  if (!updateSale) throw new Error('SaleNotFound');
  const orderStatusUpdated = await sale.findOne({ id: orderId });
  return orderStatusUpdated;
};

module.exports = {
  getSellerSales,
  updateStatus,
};
