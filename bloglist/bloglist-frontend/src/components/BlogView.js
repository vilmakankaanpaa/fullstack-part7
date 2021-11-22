import React, { useState } from 'react'

const makeid = (length) => {
  var result           = ''
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const BlogView = ({ blog, handleLike, handleRemove, loggedUser }) => {

  if (!blog){
    return null
  }

  const [comment, setComment] = useState('')

  const handleNewComment = async (event) => {
    console.log('leaving new comment', comment)
    event.preventDefault()
    setComment('')
    //dispatch(login({ username, password }))
    //notifyWith('you left a new comment')
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
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment =>
          <li key={makeid(5)}>{comment.content}</li>
        )}
      </ul>
      <form onSubmit={handleNewComment}>
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}></input>
        <button type='submit'>comment</button>
      </form>
    </div>
  )
}

export default BlogView