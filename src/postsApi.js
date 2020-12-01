import axios from 'axios'

const postsApi = axios.create({
  baseURL: 'https://creggslist.herokuapp.com',
  //baseURL: 'http://192.168.0.23:5000'
})

// creates post
const createPost = async (author_email, keywords, photo, location, content, price, title) => {
  return postsApi
    .post(`/posts`, {
      params: {
        author_email: author_email,
        keywords: keywords,
        photo: photo,
        location: location,
        content: content,
        price: price,
        title: title
      },
    })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}


// gets a user's posts
const getPosts = async (email) => {
  return postsApi
    .get(`/posts/user/${email}`)
    .then((res) => {
      return {
        postList: res.data.posts.map(function (posts) {
          return {
            author_email: posts.author_email,
            keywords: posts.keywords,
            photo: posts.photo,
            location: posts.location,
            content: posts.content,
            price: posts.price,
            title: posts.title,
            author_photo: posts.account.photo,
            author_name: posts.account.name
          }
        }),
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// update a post
const updatePost = async (postId, content) => {
  return postsApi
    .put(`/posts/${postId}`, {
        params: content
      })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// remove a post
const removePost= async (postId) => {
  return postsApi
    .delete(`/posts/${postId}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// gets first 50 posts by filters, keywords, or title starting with text input
const searchPosts = async (text, location) => {
  return postsApi
    .get(`/posts/search/${text}`, {
      params: {
        location: location
      },
    })
    .then((res) => {
      return {
        count: res.data.users.count,
        postList: res.data.users.rows.map(function (posts) {
          return {
            author_email: posts.author_email,
            keywords: posts.keywords,
            photo: posts.photo,
            location: posts.location,
            content: posts.content,
            price: posts.price,
            title: posts.title,
            author_photo: posts.account.photo,
            author_name: posts.account.name
          }
        }),
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

export default {
  createPost,
  getPosts,
  updatePost,
  removePost,
  searchPosts
}
