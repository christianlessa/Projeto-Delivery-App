
module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      primaryKey: true,
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
    models.sale.belongsToMany(models.product,
      {
        foreignKey: 'productId',
        otherKey: 'saleId',
        as: 'products',
        through: salesProduct,
      }),
    models.product.belongsToMany(models.sale,
      {
        foreignKey: 'saleId',
        otherKey: 'productId',
        as: 'sales',
        through: salesProduct,
      })
  }

  return salesProduct;
};