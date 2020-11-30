const { Accounts } = require('./models.js')

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const users = await Accounts.findAll()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Creates account
const createAccount = async (req, res) => {
  try {
    await Accounts.create({
      email: req.body.params.email,
      photo: req.body.params.photo,
      password: req.body.params.password,
      name: req.body.params.name
    })
    return res.status(201).send('Account created')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Get the account by email
const getAccountByEmail = async (req, res) => {
  try {
    const email = req.params.email
    const user = await Accounts.findOne({ where: { email: email } })
    if (user) {
      return res.status(200).json({ user })
    }
    return res.status(404).send('User with the specified email does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Update account by email
const updateAccount = async (req, res) => {
  try {
    const email = req.params.email
    const updated = await Accounts.update(req.body.params, {
      where: { email: email },
    })
    if (updated) {
      return res.status(200).send('Updated account info')
    }
    return res.status(404).send('User with the specified email does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Delete account by email
const deleteAccount = async (req, res) => {
  try {
    const email = req.params.email
    const deleted = await Accounts.destroy({
      where: { email: email },
    })
    if (deleted) {
      return res.status(204).send('User deleted')
    }
    return res.status(404).send('User with the specified email does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Check if email exists
const checkEmail = async (req, res) => {
  try {
    const email = req.params.email
    const user = await Accounts.findOne({ where: { email: email } })
    if (user) {
      return res.status(404).send('Email unavailable')
    }
    return res.status(200).send('Email available')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Check if password exists
const checkPassword = async (req, res) => {
  try {
    const password = req.params.password
    const user = await Accounts.findOne({
      where: { password: password },
    })
    if (user) {
      return res.status(404).send('Password unavailable')
    }
    return res.status(200).send('Password available')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountByEmail,
  updateAccount,
  deleteAccount,
  checkEmail,
  checkPassword
}
