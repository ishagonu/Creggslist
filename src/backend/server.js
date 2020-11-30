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

// accounts table
app
  .route('/accounts')
  .get(accounts.getAllAccounts)
  .post(accounts.createAccount)

app
  .route('/accounts/:email')
  .get(accounts.getAccountByEmail)
  .put(accounts.updateAccount)
  .delete(accounts.deleteAccount)

app
  .route('/email/:email')
  .get(accounts.checkEmail)

app
  .route('/password/:password')
  .get(accounts.checkPassword)

// posts table
app
  .route('/posts')
  .post(posts.createPosts)
  .get(posts.getAllPosts)

app
  .route('/posts/user/:email')
  .get(posts.getUserPosts)

app
  .route('/posts/search/:text')
  .get(posts.searchPosts)

app
  .route('/posts/:post')
  .delete(posts.deletePost)
  .put(posts.updatePost)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})