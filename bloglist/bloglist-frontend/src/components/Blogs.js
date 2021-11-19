import React from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Table from 'react-bootstrap/Table'

const Blogs = ({
  blogs,
  loggedUser,
  blogFormRef,
  addBlog
}) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog addBlog={addBlog} user={loggedUser} />
      </Togglable>

      <Table striped>
        <tbody>
          {blogs.sort(byLikes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Blog blog={blog} />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs