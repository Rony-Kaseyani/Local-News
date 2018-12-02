'use strict'
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    'News',
    {
      category: DataTypes.STRING,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      image: DataTypes.STRING,
      approved: DataTypes.BOOLEAN,
      pinned: DataTypes.BOOLEAN
    },
    {}
  )
  News.associate = function(models) {
    // associations can be defined here
    //news belongs to a user
    News.belongsTo(models.user)
    News.hasMany(models.Ratings)
  }
  return News
}
