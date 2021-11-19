import React from 'react'

const BlogView = ({ blog, handleLike, handleRemove, loggedUser }) => {

  if (!blog){
    return null
  }

  const own = loggedUser.username===blog.user.username

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
        <p>added by {blog.user.name}</p>
        {own&&<button onClick={() => handleRemove(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default BlogView