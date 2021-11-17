import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => (
    <>
      <br/>
      <button
        id='remove-button'
        onClick={() => handleRemove(blog)}>
          Remove
      </button>
    </>
  )

  const blogTeaser = () => (
    <div className='teaserContent'>
      {blog.title} by {blog.author}
      <button id='view-button' onClick={toggleVisibility}>
        view
      </button>
    </div>
  )

  const blogDetails = () => (
    <div className='detailedContent'>
      {blog.title}
      <button onClick={toggleVisibility}>
        hide
      </button>
      <br/> {blog.url}
      <br/> likes {blog.likes}
      <button id='like-button' onClick={() => handleLike(blog)}>
        like
      </button>
      <br/> {blog.user.username}
      { own && removeButton() }
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      { !visible
        ? blogTeaser()
        : blogDetails()
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog