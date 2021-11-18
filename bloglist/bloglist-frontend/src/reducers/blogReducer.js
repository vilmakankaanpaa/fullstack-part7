const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [...state, action.data]

  case 'LIKE': {
    const likedBlog = action.data
    return state.map(blog =>
      blog.id !== blog.id ? blog : likedBlog
    )
  }

  case 'REMOVE_BLOG': {
    const id = action.data
    return state.filter(blog => blog.id !== id)
  }

  default: return state
  }

}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const likeBlog = (blog) => {
  return {
    type: 'LIKE',
    data: blog
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: id
  }
}

export default blogReducer