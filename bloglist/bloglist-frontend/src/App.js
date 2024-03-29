import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Users from './components/Users'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import BlogView from './components/BlogView'
import Menu from './components/Menu'
import Headline from './components/Headline'

import { initBlogs, createBlog, likeBlog, removeBlog, commentBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initUsers } from './reducers/userReducer'
import { login, logout } from './reducers/loggedUserReducer'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate =  useNavigate()

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

  const handleLogout = async () => {
    notifyWith('You are logged out')
    dispatch(logout())
  }

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
      navigate('/')
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
        navigate('/')
      } catch (exception) {
        notifyWith('Blog could not be deleted.','error')
      }
    }
  }

  const addComment = async (blog, comment) => {
    dispatch(commentBlog(blog, comment))
    notifyWith('a new comment added!')
    navigate(`/blogs/${blog.id}`)
  }

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div className='container'>

      <Menu />
      <Headline loggedUser={loggedUser} handleLogout={handleLogout}/>
      <Notification notification={notification} />

      <Routes>
        <Route path='/' element={
          loggedUser
            ? <div>
              <Blogs blogs={blogs} loggedUser={loggedUser}
                blogFormRef={blogFormRef} addBlog={addBlog} />
              <Users users={users} />
            </div>
            : <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
        } />
        <Route path='users' element={ <Users users={users} /> }/>
        <Route path='users/:id' element={
          <div>
            <User user={user} blogs={blogs} />
          </div>
        } />
        <Route path='blogs' element={
          <Blogs blogs={blogs} loggedUser={loggedUser}
            blogFormRef={blogFormRef} addBlog={addBlog} />} />
        <Route path='blogs/:id' element={
          <div>
            <BlogView
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleRemove={() => handleRemove(blog)}
              addComment={addComment}
              loggedUser={loggedUser}
            />
          </div>
        } />
      </Routes>

    </div>
  )
}

export default App