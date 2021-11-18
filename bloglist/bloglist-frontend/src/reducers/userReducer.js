import userService from '../services/users'

const userReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_USERS':
    return action.data

  case 'NEW_USER':
    return [...state, action.data]

  case 'REMOVE_USER': {
    const id = action.data
    return state.filter(user => user.id !== id)
  }

  default: return state
  }

}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const createUser = (user) => {
  return async dispatch => {
    await userService.create(user)
    dispatch({
      type: 'NEW_USER',
      data: user
    })
  }
}

export const removeUser = (id) => {
  return async dispatch => {
    await userService.remove(id)
    dispatch({
      type: 'REMOVE_USER',
      data: id
    })
  }
}

export default userReducer