import axios from 'axios'

var myId = ''
const postsApi = axios.create({
  baseURL: 'localhost',
  //baseURL: 'http://192.168.0.23:5000'
})

// creates post
const createPost = async (post, content, author,) => {
  return postsApi
    .post(`/posts`, {
      params: {
        post: post,
        content: content, 
        author: author,
        date: date,
      },
    })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}


// gets a users posts
const getPosts = async () => {
  return postsApi
    .get(`/posts/${myId}`)
    .then((res) => {
      return {
        postList: res.data.posts.map(function (posts) {
          return {
            id: posts.p_id,
            content: posts.content,
            author: posts.author_id,
          }
        }),
      }
    })
    .catch((error) => {
      throw error.response.status
    })
}

// update a post
const updatePost = async (post, content) => {
  return postsApi
    .put(`/posts/${myId}/${post}`, {
        params: {
          content: content
        },
      })
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

// remove a post
const removePost= async (post) => {
  return postsApi
    .delete(`/posts/${myId}/${post}`)
    .then((res) => {
      return res.status
    })
    .catch((error) => {
      throw error.response.status
    })
}

export default {
  createPost,
  getPosts,
  updatePost,
  removePost
  
}
