const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    hp: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    attack: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    defense: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    speed: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    height: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    weight: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  },
  { 
    timestamps: false, 
    freezeTableName: true,
  }
  );
};
