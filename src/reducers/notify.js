import { Notification } from '../constants/ActionTypes'

const notify = (state = {
  display: false,
  message: ''
}, action) => {
  switch (action.type) {
    case Notification.close:
      return Object.assign({}, state, {
        display: false
      })
    case Notification.show:
      return Object.assign({}, state, {
        display: true,
        message: action.payload
      })
    case Notification.request:
    default:
      return state
  }
}

export default notify
