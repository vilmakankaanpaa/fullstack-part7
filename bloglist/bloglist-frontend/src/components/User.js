import React from 'react'

const User = ({ user, blogs }) => {

  if (!user || !blogs){
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.key}> {blog.title} </li>
        )}
      </ul>
    </div>
  )
}

export default User