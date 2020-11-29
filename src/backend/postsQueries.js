const { Accounts, Posts } = require('./models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op
var attributes = ['username', 'photo', 'name']

// Creates a post by a certain author
const createPosts = async (req, res) => {
  try {
    await Posts.bulkCreate([
      {
          p_id: req.body.params.post,
          content: req.body.params.content, 
          author_id: req.body.params.author,
          date: req.body.params.date,
          include: [Accounts] },
    ])
    return res.status(201).send('Post created')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Get all of a user's posts
const getPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { author_id: req.params.user },
      include: [
        {
          model: Accounts,
        },
      ],
    })
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Delete a post
const deletePost = async (req, res) => {
  try {
    const destroyed = await Posts.destroy({
      where: {
        p_id: req.params.post
      },
    })
    if (destroyed) {
      return res.status(204).send('Post deleted')
    }
    return res.status(404).send('Post not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Update post by id
const updatePost = async (req, res) => {
    try {
      const { id } = req.params.post
      const updated = await Post.update({content: req.body.params.content}, {
        where: { p_id: id },
      })
      if (updated) {
        return res.status(200).send('Updated post content')
      }
      return res.status(404).send('Post with the specified ID does not exists')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }

module.exports = {
    createPosts,
    getPosts,
    deletePost,
    updatePost,
}
