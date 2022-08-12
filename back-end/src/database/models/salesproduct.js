
module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      primaryKey: true,
      field: 'sale_id'
    },
    productId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      primaryKey: true,
      field: 'product_id'
    },
    quantity: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  },  { 
    tableName: 'sales_products',
    timestamps: false,
    underscored: true
  });

  salesProduct.associate = function (models) {
    models.product.belongsToMany(models.sale,
      {
        as: 'sales',
        foreignKey: 'saleId',
        through: salesProduct,
        otherKey: 'product_id'
      }),
      models.sale.belongsToMany(models.product,
      {
        as: 'products',
        foreignKey: 'productId',
        through: salesProduct,
        otherKey: 'sale_id'
      })
  }

  return salesProduct;
};