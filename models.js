const { Sequelize, DataTypes } = require('sequelize')

// configuration for database
const config = {
  user: process.env.USERS_USER,
  username: process.env.USERS_USER,
  host: process.env.USERS_HOST,
  password: process.env.USERS_PASSWORD,
  port: process.env.USERS_PORT,
  database: process.env.USERS_DATABASE,
  dialect: 'postgresql',
  ssl: {
    rejectUnauthorized: false,
  },
}
const sequelize = new Sequelize(config)
const Accounts = sequelize.define(
  'accounts',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: DataTypes.STRING,
    inSession: DataTypes.BOOLEAN,
    // password: DataTypes.STRING(20)
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id', 'username', 'email'],
      },
    ],
  },
)

const Posts = sequelize.define('posts', {
  p_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  date: {
      type: DataTypes.DATE,
      allowNull: false
  },
  content: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
})

Posts.belongsTo(Accounts, { foreignKey: 'author_id', foreignKeyConstraint: true })

/*sequelize.sync({ force: true }).then(() => {
  console.log('Friend model was synchronized successfully.')
})*/

module.exports = { Accounts, Posts }
