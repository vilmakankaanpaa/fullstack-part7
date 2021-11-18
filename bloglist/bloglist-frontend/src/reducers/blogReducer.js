import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [...state, action.data]

  case 'LIKE': {
    const likedBlog = action.data
    return state.map(blog =>
      blog.id !== likedBlog.id ? blog : likedBlog
    )
  }

  case 'REMOVE_BLOG': {
    const id = action.data
    return state.filter(blog => blog.id !== id)
  }

  default: return state
  }

}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export default blogReducer