const { Sequelize, DataTypes } = require('sequelize')

// configuration for database
const config = {
  user: process.env.USERS_USER,
  username: process.env.USERS_USER,
  password: process.env.USERS_PASSWORD,
  port: process.env.USERS_PORT,
  database: process.env.USERS_DATABASE,
  host: 'localhost',
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
  author_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keywords: {
    type: DataTypes.ARRAY(Sequelize.STRING)
  },
  photos: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

Posts.belongsTo(Accounts, { foreignKey: 'author_info', foreignKeyConstraint: true })

sequelize.sync({ force: true }).then(() => {
  console.log('Model was synchronized successfully.')
})

module.exports = { Accounts, Posts }
