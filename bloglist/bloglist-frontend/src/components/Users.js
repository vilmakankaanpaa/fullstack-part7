import React from 'react'
import User from './User'

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user =>
          <User key={user.id} user={user} />
        )}
      </ul>
    </div>
  )
}

export default Users