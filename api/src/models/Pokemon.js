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
      defaultValue: '100'
    },

    //Ataque del Pokemon
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: '100'
    },

    //Defensa del Pokemon
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: '100'
    },

    //Velocidad del Pokemon
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: '100'
    },

    //Altura del Pokemon
    height: {
      type: DataTypes.INTEGER,
      defaultValue: '100'
    },

    //Peso del Pokemon
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: '100'
    },

    //Imagen del Pokemon
    sprite: {
      type: DataTypes.TEXT,
      validate: { isUrl: true },
      defaultValue: 'https://w7.pngwing.com/pngs/248/960/png-transparent-pikachu-pokemon-go-silhouette-drawing-pikachu-dog-like-mammal-fictional-character-black-thumbnail.png'      
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
