import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    console.log('initializing')
    blogService.getAll().then(blogs => {
      dispatch(initBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(login(user))
  }, [])

  let timeoutId
  const notifyWith = (message, type='success') => {
    if (timeoutId) clearTimeout(timeoutId)
    dispatch(setNotification({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(login(user))
      notifyWith('login succeeded')
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    storage.logoutUser()
    notifyWith('You´re logged out')
    dispatch(logout())
  }

  const addBlog = async (blog) => {
    try {
      await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      notifyWith('Could not add blog: missing details.','error')
    }
  }

  const handleLike = async (blog) => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(likedBlog)
      dispatch(likeBlog(likedBlog))
      notifyWith('Your like was saved!')
    } catch (error) {
      notifyWith('Like could not be added.','error')
    }
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      try {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
        notifyWith(`Blog by ${blog.author} removed.`)
      } catch (exception) {
        notifyWith('Blog could not be deleted.','error')
      }
    }
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog addBlog={addBlog} user={user} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App