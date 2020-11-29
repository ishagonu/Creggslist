import axios from 'axios'

const accountsApi = axios.create({
  baseURL: 'localhost',
  //baseURL: 'http://192.168.0.23:5000'
})

// creates user and returns id
const createUser = async (name, id, username, email, photo, location) => {
  return accountsApi
    .post('/accounts', {
      params: {
        id: id,
        name: name,
        username: username,
        email: email,
        photo: photo,
        location:location
      },
    })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// gets list of users
const getAllUsers = async () => {
  return accountsApi
    .get('/accounts')
    .then((res) => {
      return {
        status: res.status,
        userList: res.data.users.map(function (users) {
          // returns individual user info
          return {
            name: users.name,
            username: users.username,
            photo: users.photo,
            id: users.id,
            location: location.id
          }
        }),
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// gets first 100 account usernames/names starting with text input
const searchUsers = async (text) => {
  return accountsApi
    .get(`/accounts/search/${text}`)
    .then((res) => {
      return {
        status: res.status,
        count: res.data.users.count,
        userList: res.data.users.rows.map(function (users) {
          // returns individual user info
          return {
            name: users.name,
            username: users.username,
            photo: users.photo,
            id: users.id,
            location: location.id
          }
        }),
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// deletes user and returns status
const deleteUser = async () => {
  return accountsApi
    .delete(`/accounts/${myId}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// gets user by id and returns user info
const getUser = async (id) => {
  return accountsApi
    .get(`/accounts/${id}`)
    .then((res) => {
      return {
        location: res.location,
        username: res.data.user.username,
        email: res.data.user.email,
        phone_number: res.data.user.phone_number,
        name: res.data.user.name,
        photo: res.data.user.photo,
        id: res.data.user.id,
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// update email and returns status
const updateEmail = async (info) => {
  const req = {
    email: info,
  }
  return updateUser(req)
}

// update username and returns status
const updateUsername = async (info) => {
  const req = {
    username: info,
  }
  return updateUser(req)
}

// update username and returns status
const updateName = async (info) => {
  const req = {
    name: info,
  }
  return updateUser(req)
}

// update username and returns status
const updatePhoneNumber = async (info) => {
  const req = {
    phone_number: info,
  }
  return updateUser(req)
}

// updates user and returns status
const updateUser = async (req) => {
  return accountsApi
    .put(`/accounts/${myId}`, {
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

// checks username and returns status
const checkUsername = async (username) => {
  return accountsApi
    .get(`/username/${username}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// checks phone number and returns status
const checkPhoneNumber = async (phoneNumber) => {
  return accountsApi
    .get(`/phoneNumber/${phoneNumber}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

export default {
    createUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateEmail,
  updateUsername,
  updateName,
  updatePhoneNumber,
  checkUsername,
  checkPhoneNumber,
  searchUsers,
}
