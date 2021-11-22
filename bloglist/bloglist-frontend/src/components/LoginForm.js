
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {

  return (
    <div>
      <h2>login to application</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='text'
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant='primary' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm