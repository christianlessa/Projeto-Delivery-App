const moment = require('moment');
const { sale, salesProduct, user } = require('../../database/models');

const checkSeller = async (sellerName) => {
  const { id } = await user.findOne({ where: { name: sellerName } });
  return id;
};

const getAllSales = async () => {
  const sales = await sale.findAll();
  return sales;
}

const getSaleById = async (id) => {
  const saleById = await sale.findOne({ where: { id } });
  return saleById;
}

const createSalesProduct = async (saleId, products) => {
  const newSalesProduct = await products.map((product) => (
    { saleId, productId: product.id, quantity: product.quantity }
  ));
  await salesProduct.bulkCreate(newSalesProduct);
};

const createNewOrder = async (userId, data) => {
  const { totalPrice, deliveryAddress, deliveryNumber } = data;
  const sellerId = await checkSeller(data.sellerName);

  const { id, saleDate, status } = await sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
    saleDate: moment().format('L'),
  });

  await createSalesProduct(id, data.products);

  const newSale = { 
    id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
  };

  return newSale;
};

module.exports = {
  createNewOrder,
  getAllSales,
  getSaleById
};
