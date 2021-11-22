import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlog = ({ addBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    addBlog({
      title, author, url, likes: 0, user, comments: []
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group controlId='FormNewBlog'>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant='primary' type='submit'>
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog