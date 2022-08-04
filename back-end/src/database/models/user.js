
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(300),
      allowNull: false,
    }
  }, {timestamps: false, tableName: 'Users' });
  return User;
};