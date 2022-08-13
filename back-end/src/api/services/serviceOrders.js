const Joi = require('joi');
const { sale, salesProduct, user, product } = require('../../database/models');

const ORDER = Joi.object({
  sellerName: Joi.string().required(),
  products: Joi.array().items(
    Joi.object(
      {
        id: Joi.number().required(),
        quantity: Joi.number().integer().required(),
      },
    ),
  ),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
});

const checkSeller = async (sellerName) => {
  const { id } = await user.findOne({ where: { name: sellerName } });
  return id;
};

const getAllSales = async () => {
  const allSales = await sale.findAll();
  return allSales;
};

const getSaleById = async (id) => {
  const saleById = await sale.findOne({ where: { id } });

  if (!saleById) throw new Error('SaleNotFound');

  return saleById;
};

const createSalesProduct = async (saleId, products) => {
  const newSalesProduct = await products.map((element) => (
    { saleId, productId: element.id, quantity: element.quantity }
  ));
  await salesProduct.bulkCreate(newSalesProduct);
};

const createNewOrder = async (userId, data) => {
  const { error } = ORDER.validate(data);
  if (error) throw error;
  
  const { totalPrice, deliveryAddress, deliveryNumber } = data;
  const sellerId = await checkSeller(data.sellerName);

  const { id, saleDate, status } = await sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
    saleDate: Date.now(),
  });
  await createSalesProduct(id, data.products);
  const newSale = { 
    id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
  };
  return newSale;
};

const getAllByUserId = async (userId) => {
  console.log(userId);
  const ordersFromDb = await sale.findAll({
    where: { userId },
      include: [
      { model: product, as: 'products' },
      { model: user, as: 'seller' },
    ] });
  return ordersFromDb;
};

const updateStatus = async (id) => {
  const [updateSale] = await sale.update(
    { status: 'Entregue' },
    { where: { id } },
  );

  if (!updateSale) throw new Error('SaleNotFound');
};

module.exports = {
  createNewOrder,
  getAllSales,
  getSaleById,
  getAllByUserId,
  updateStatus,
};

