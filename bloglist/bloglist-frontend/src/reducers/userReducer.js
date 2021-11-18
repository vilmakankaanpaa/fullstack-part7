const userReducer = (state = null, action) => {

  switch (action.type) {

  case 'SET_USER':
    return action.data

  case 'CLEAR_USER':
    return null

  default: return state
  }
}

export const login = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default userReducer