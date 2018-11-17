'use strict'
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    audio: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    pinned: DataTypes.BOOLEAN
  }, {})
  News.associate = function(models) {
    // associations can be defined here
  }
  return News;
}