'use strict';
module.exports = (sequelize, DataTypes) => {
  const center = sequelize.define(
    'center',
    {
      latitude: DataTypes.FLOAT(9, 6),
      longitude: DataTypes.FLOAT(9, 6),
      centerName: DataTypes.STRING,
      addressName: DataTypes.STRING,
      roadAddressName: DataTypes.STRING,
      phone: DataTypes.STRING,
      rateAvg: {
        type: DataTypes.FLOAT(3, 2),
        defaultValue: 0,
        allowNull: false,
      },
    },
    { timestamps: false, charset: 'utf8', collate: 'utf8_unicode_ci' }
  );
  center.associate = function (models) {
    center.hasOne(models.centerAdmin, {
      foreignKey: 'centerId',
    });
    center.hasMany(models.tag, {
      foreignKey: 'centerId',
    });
  };
  return center;
};
