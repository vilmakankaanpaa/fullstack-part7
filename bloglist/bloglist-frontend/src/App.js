import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Users from './components/Users'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initUsers } from './reducers/userReducer'
import { login, logout } from './reducers/loggedUserReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    dispatch(login())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const notifyWith = (message, type='success') => {
    dispatch(setNotification({ message, type }, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')
      dispatch(login({ username, password }))
      notifyWith('login succeeded')
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    notifyWith('You are logged out')
    dispatch(logout())
  }

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      notifyWith('Could not add blog: missing details.','error')
    }
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      notifyWith('Your like was saved!')
    } catch (error) {
      notifyWith('Like could not be added.','error')
    }
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      try {
        dispatch(removeBlog(blog.id))
        notifyWith(`Blog by ${blog.author} removed.`)
      } catch (exception) {
        notifyWith('Blog could not be deleted.','error')
      }
    }
  }

  if ( !loggedUser ) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <Blogs
        blogs={blogs}
        loggedUser={loggedUser}
        handleLogout={handleLogout}
        blogFormRef={blogFormRef}
        addBlog={addBlog}
        handleLike={handleLike}
        handleRemove={handleRemove}
      />
      <Users users={users}/>
    </div>
  )
}

export default App