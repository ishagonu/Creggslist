const { Sequelize, DataTypes } = require('sequelize')

// configuration for database
const config = {
  user: process.env.USERS_USER,
  username: process.env.USERS_USER,
  password: process.env.USERS_PASSWORD,
  port: process.env.USERS_PORT,
  database: process.env.USERS_DATABASE,
  host: process.env.USERS_HOST,
  dialect: 'postgresql',
  ssl: {
    rejectUnauthorized: false,
  },
}
const sequelize = new Sequelize(config)
const Accounts = sequelize.define(
  'accounts',
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }
)

const Posts = sequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title:  {
    type: DataTypes.STRING,
    allowNull: false
  },
  keywords: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  photo: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

Posts.belongsTo(Accounts, { foreignKey: 'author_email', foreignKeyConstraint: true })

// sequelize.sync({ force: true }).then(() => {
//   console.log('Model was synchronized successfully.')
// })

module.exports = { Accounts, Posts }
