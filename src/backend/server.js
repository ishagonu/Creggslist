const express = require('express')
const bodyParser = require('body-parser')
const accounts = require('./accountsQueries.js')
const posts = require('./postsQueries.js')

const app = express()
var PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

// if development mode, allow self-signed ssl
if (app.get('env') === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

// // accounts table
// app
//   .route('/accounts')
//   .get(accounts.getAllAccounts)
//   .post(accounts.createAccount)

// app
//   .route('/accounts/:id')
//   .get(accounts.getAccountById)
//   .put(accounts.updateAccount)
//   .delete(accounts.deleteAccount)

// app
//   .route('/email/:email')
//   .get(accounts.checkEmail)

// app
//   .route('/email/:password')
//   .get(accounts.checkPassword)

// // friendships table
// app
//   .route('/posts')
//   .post(posts.createPosts)
//   .get(posts.getPosts)

// app
//   .route('/posts/:user')
//   .get(posts.getPost)

// app
//   .route('/posts/search/:text')
//   .get(posts.searchPosts)

// app
//   .route('/posts/:user/:post')
//   .delete(posts.deletePost)
//   .put(posts.updatePost)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})