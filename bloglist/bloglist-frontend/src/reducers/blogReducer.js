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
    const removedBlog = action.data
    return state.filter(blog => blog.id !== removedBlog.id)
  }

  default: return state
  }

}

export default blogReducer