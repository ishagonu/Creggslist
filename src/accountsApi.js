import axios from 'axios'

const accountsApi = axios.create({
  baseURL: 'https://creggslist.herokuapp.com/'
  //baseURL: 'http://192.168.0.23:5000'
})

// creates user and returns status
const createUser = async (name, password, email, photo) => {
  return accountsApi
    .post('/accounts', {
      params: {
        email: email,
        photo: photo,
        password: password,
        name: name
      },
    })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      console.log(error)
    })
}



// deletes user and returns status
const deleteUser = async (email) => {
  return accountsApi
    .delete(`/accounts/${email}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// gets user by email and returns user info
const getUser = async (email) => {
  return accountsApi
    .get(`/accounts/${email}`)
    .then((res) => {
      return {
        email: res.data.user.email,
        name: res.data.user.name,
        photo: res.data.user.photo,
        password: res.data.user.password,
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// update name and returns status
const updateName = async (info, email) => {
  const req = {
    name: info
  }
  return updateUser(req, email)
}

// update photo and returns status
const updatePhoto = async (info, email) => {
  const req = {
    photo: info
  }
  return updateUser(req, email)
}

// update password and returns status
const updatePassword = async (info, email) => {
  const req = {
    password: info
  }
  return updateUser(req, email)
}

// updates user and returns status
const updateUser = async (req, email) => {
  return accountsApi
    .put(`/accounts/${email}`, {
      params: req,
    })
    .then((res) => {
      return {
        status: res.status,
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// checks email and returns status
const checkEmail = async (email) => {
  return accountsApi
    .get(`/email/${email}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// checks phone number and returns status
const checkPassword = async (password) => {
  return accountsApi
    .get(`/password/${password}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

const verifyAccount = async (email, password) => {
  return accountsApi
    .post(`/accounts/verify`, {
      params: {
        email: email,
        password: password
      }
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error.response.status
    })
}

export default {
  createUser,
  deleteUser,
  getUser,
  updateName,
  updatePassword,
  updatePhoto,
  checkEmail,
  checkPassword,
  verifyAccount
}
