const notificationReducer = (state = null, action) => {

  switch(action.type) {
  case 'SET NEW':
    return action.data

  case 'CLEAR':
    return null

  default: return state
  }
}

let timeoutId

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(setNew(notification))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, timeout * 1000)
  }
}

export const setNew = (notification) => {
  return {
    type: 'SET NEW',
    data: notification
  }
}

export const remove = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer