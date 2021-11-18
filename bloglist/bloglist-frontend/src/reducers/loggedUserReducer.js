import loginService from '../services/login'
import storage from '../utils/storage'

const userReducer = (state = null, action) => {

  switch (action.type) {

  case 'SET_USER':
    return action.data

  case 'CLEAR_USER':
    return null

  default: return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    let user
    if (credentials) {
      user = await loginService.login(
        { username: credentials.username, password: credentials.password })
      storage.saveUser(user)
    } else {
      user = storage.loadUser()
    }
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logout = () => {
  storage.logoutUser()
  return {
    type: 'CLEAR_USER'
  }
}

export default userReducer