'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { model: 'users', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'user_id'
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { model: 'users', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'seller_id'
      },
      total_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false
      },
      delivery_address: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   field: 'sale_date',
      //   defaultValue: Sequelize.NOW
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};