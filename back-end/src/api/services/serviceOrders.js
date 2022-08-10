const moment = require('moment');
const Joi = require('joi');
const { sale, salesProduct, user } = require('../../database/models');

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
  deliveryNumber: Joi.number().integer().required(),
});

const checkSeller = async (sellerName) => {
  const { id } = await user.findOne({ where: { name: sellerName } });
  return id;
};

const createSalesProduct = async (saleId, products) => {
  const newSalesProduct = await products.map((product) => (
    { saleId, productId: product.id, quantity: product.quantity }
  ));
  await salesProduct.bulkCreate(newSalesProduct);
};

const createNewOrder = async (userId, data) => {
  const { error } = ORDER.validate(data);
  if (error) throw new Error('empty field');
  
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
};
