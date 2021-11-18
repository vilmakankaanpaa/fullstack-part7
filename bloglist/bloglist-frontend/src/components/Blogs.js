import React from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = ({
  blogs,
  loggedUser,
  handleLogout,
  blogFormRef,
  addBlog,
  handleLike,
  handleRemove
}) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      <h2>Blogs</h2>

      <p>
        {loggedUser.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog addBlog={addBlog} user={loggedUser} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={loggedUser.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default Blogs