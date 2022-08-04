
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, field: 'user_id' },
    sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, field: 'seller_id' },
    total_price: { type: DataTypes.DECIMAL(9, 2), allowNull: false },
    delivery_address: { type: DataTypes.STRING(100), allowNull: false },
    delivery_number: { type: DataTypes.STRING(50), allowNull: false },
    status: { type: DataTypes.STRING(50), allowNull: false },
  }, {createdAt: { allowNull: false, type: DataTypes.DATE, field: 'sale_date'} });

  Sale.associate = function (models) {
    models.Sale.belongsTo(models.User,
      {
        foreignKey: "user_id", as: 'Customer'
      }),
      models.Sale.belongsTo(models.User,
      {
        foreignKey: "seller_id", as: 'Seller'
      })
  }
  return Sale;
};