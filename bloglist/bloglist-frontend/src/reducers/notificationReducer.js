const notificationReducer = (state = null, action) => {

  switch(action.type) {
  case 'SET NEW':
    return action.data

  case 'CLEAR':
    return null

  default: return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET NEW',
    data: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR'
  }
}

// let timeoutId = null

// export const setNotification = (notification, timeout) => {
//   return async dispatch => {
//     clearTimeout(timeoutId)
//     dispatch({
//       type: 'SET NEW',
//       data: notification
//     })
//     timeoutId = setTimeout(() => {
//       dispatch({
//         type: 'CLEAR'
//       })
//     }, timeout * 1000)
//   }
// }

export default notificationReducer