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

    //Nombre del Pokemon
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    //Puntos de vida del Pokemon
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    //Ataque del Pokemon
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    //Defensa del Pokemon
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    //Velocidad del Pokemon
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    //Altura del Pokemon
    height: {
      type: DataTypes.INTEGER,
      defaultValue: '50'
    },

    //Peso del Pokemon
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
