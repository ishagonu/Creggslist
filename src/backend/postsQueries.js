const { Accounts, Posts } = require('./models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op
var attributes = ['photo', 'name']

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll()
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Creates a post by a certain author
const createPosts = async (req, res) => {
  try {
    await Posts.create(
      {
        author_email: req.body.params.author_email,
        keywords: req.body.params.keywords,
        photo: req.body.params.photo,
        location: req.body.params.location,
        content: req.body.params.content,
        price: req.body.params.price,
        title: req.body.params.title,
        include: [Accounts]
      },
    )
    return res.status(201).send('Post created')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Get all of a user's posts
const getUserPosts = async (req, res) => {
  try {
    const email = req.params.email
    const posts = await Posts.findAll({
      where: { author_email: email },
      include: [
        {
          model: Accounts,
          attributes: attributes
        },
      ],
    })
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Delete a post by id
const deletePost = async (req, res) => {
  try {
    const post = req.params.post
    const destroyed = await Posts.destroy({
      where: { id: post }
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
    const post = req.params.post
    const updated = await Posts.update(req.body.params, {
      where: { id: post },
    })
    if (updated) {
      return res.status(200).send('Updated post content')
    }
    return res.status(404).send('Post with the specified ID does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Get first 50 posts by title/keywords + filters
const searchPosts = async (req, res) => {
  try {
    const text = req.params.text
    if (req.body.params.location) {
      const users = await Posts.findAndCountAll({
        limit: 50,
        where: {
          [Op.and]: [{
            [Op.or]: [
              {
                title: { [Op.iLike]: `%${text}%` }
              },
              {
                keywords: { [Op.contains]: [text] }
              }
            ]
          },
          {
            location: req.body.params.location
          },
          ]
        },
        include: [
          {
            model: Accounts,
            attributes: attributes
          },
        ],
      })
      return res.status(200).json({ users })
    } else {
      const users = await Posts.findAndCountAll({
        limit: 50,
        where: {
          [Op.or]: [
            {
              title: { [Op.iLike]: `%${text}%` }
            },
            {
              keywords: { [Op.contains]: [text] }
            }
          ]
        },
        include: [
          {
            model: Accounts,
            attributes: attributes
          },
        ],
      })
      return res.status(200).json({ users })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getAllPosts,
  createPosts,
  getUserPosts,
  deletePost,
  updatePost,
  searchPosts
}
