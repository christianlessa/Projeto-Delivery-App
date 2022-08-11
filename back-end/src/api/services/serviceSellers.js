const { sale, salesProduct, user } = require('../../database/models');

const getIdSales = async () => {
    const sales = await sale.findAll();
      return sales.map((data)=>data.id); //retorna um array com id de todas as vendas
    }

  module.exports = {
    getIdSales
  }