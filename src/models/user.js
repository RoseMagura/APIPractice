'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.image, {
          foreignKey: 'userId'
      });
      User.hasMany(models.like, {
          foreignKey: 'userId'
      });
      User.hasMany(models.comment, {
          foreignKey: 'userId'
      });
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};