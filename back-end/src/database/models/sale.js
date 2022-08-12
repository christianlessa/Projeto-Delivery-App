
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    totalPrice: { type: DataTypes.DECIMAL(9, 2), allowNull: false },
    deliveryAddress: { type: DataTypes.STRING(100), allowNull: false },
    deliveryNumber: { type: DataTypes.STRING(50), allowNull: false },
    status: { type: DataTypes.STRING(50), allowNull: false },
    saleDate: { type: DataTypes.DATE, allowNull: false },
  }, 
  { 
    // createdAt: "sale_date",
    // updateAt: false,
    timestamps: false,
    tableName: 'sales',
    underscored: true
  });

  Sale.associate = function (models) {
    models.sale.belongsTo(models.user,
      {
        foreignKey: "userId", as: 'Customer'
      }),
      models.sale.belongsTo(models.user,
      {
        foreignKey: "sellerId", as: 'Seller'
      })
  }
  return Sale;
};
