'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    {
      rate: {
        type: DataTypes.FLOAT(2, 1),
        defaultValue: 0,
        allowNull: false,
      },
      content: DataTypes.TEXT,
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        get: function () {
          return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  review.associate = function (models) {
    review.belongsTo(models.anonymousUser, {
      foreignKey: 'anonymousUserId',
    });
    review.belongsToMany(models.specialty, {
      through: 'reviewAndSpecialty',
      foreignKey: 'reviewId',
    });
  };
  return review;
};
