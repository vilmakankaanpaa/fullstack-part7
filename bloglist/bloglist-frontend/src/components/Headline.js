import React from 'react'

const Headline = ({ loggedUser, handleLogout }) => {
  return (
    <div>
      {loggedUser &&
        <p>
          {loggedUser.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
        </p>}
      <h2>Blog App</h2>
    </div>
  )
}

export default Headline