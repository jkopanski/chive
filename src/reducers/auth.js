import { Auth } from '../constants/ActionTypes'

const auth = (state = {
  username: undefined,
  isAuthPending: false
}, action) => {
  switch (action.type) {
    case Auth.login:
      return Object.assign({}, state, {
        username: (action.error ? undefined : state.username),
        isAuthPending: false,
        token: (action.error ? undefined : action.payload.token)
      })
    case Auth.logout:
      return Object.assign({}, state, {
        username: undefined,
        isAuthPending: false,
        token: undefined
      })
    case Auth.request:
      return Object.assign({}, state, {
        username: action.payload.username,
        isAuthPending: true
      })
    default:
      return state
  }
}

export default auth
