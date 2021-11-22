const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const user = await request.user

  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()

  const updatedUser = {
    username: user.username,
    name: user.name,
    blogs: user.blogs.concat(blog)
  }
  await User.findByIdAndUpdate(user._id, updatedUser, { new: true })

  response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
 
  const user = await request.user

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(400).json({ error: 'unauthorized action' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

  // Also remove the blog from users info
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log(updatedBlog)
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = await Blog.findById(request.params.id)

  console.log(blog)

  const comment = new Comment({
    _id: body._id,
    content: body.content,
    blog: blog._id
  })
  const savedComment = await comment.save()

  console.log('savedcomment', savedComment)

  const updatedBlog = {
    comments: blog.comments.concat(comment)
  }

  console.log('updated blog',updatedBlog)

  const savedBlog = await Blog.findByIdAndUpdate(
    blog._id, updatedBlog, { new: true })

  console.log(savedBlog.comments)

  response.json(savedComment)
})

blogsRouter.delete('/:id/comments/:commentid', async (request, response) => {

  const commentId = request.params.commentid
  const blog = await Blog.findById(request.params.id)

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0,
    comments: blog.comments.filter(comment => comment._id !== commentId)
  }
  
  await Comment.findByIdAndRemove(request.params.commentid)
  
  await Blog.findByIdAndUpdate(blog.id, updatedBlog, { new: true })
  response.status(204).end()
})

module.exports = blogsRouter