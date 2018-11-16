'use strict'
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {})
  Category.associate = function(models) {
    // associations can be defined here
    models.Category.hasMany(models.News)
  }
  return Category;
}