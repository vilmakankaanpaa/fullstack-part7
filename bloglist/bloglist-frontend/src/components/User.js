import React from 'react'

const User = ({ user, blogs }) => {

  if (!user || !blogs){
    return null
  }

  const showBlog = (blog) => {
    const found = blogs.find(b => b.id === blog.id)
    return (
      <li key={found.key}> {found.title} </li>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map(blog =>
          showBlog(blog)
        )}
      </ul>
    </div>
  )
}

export default User