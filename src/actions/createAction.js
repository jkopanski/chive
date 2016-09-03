export default function createAction (type, actionCreator, metaCreator) {
  // use custom identity fn since currying makes it ill behave on
  // action creators with no arguments
  const finalActionCreator = typeof actionCreator === 'function'
    ? actionCreator
    : x => x

  const actionHandler = (...args) => {
    const action = {
      type
    }

    const payload = finalActionCreator(...args)
    if (!(payload === null || payload === undefined)) {
      action.payload = payload
    }

    if (action.payload instanceof Error) {
      action.error = true
    }

    if (typeof metaCreator === 'function') {
      action.meta = metaCreator(...args)
    }

    return action
  }

  actionHandler.toString = () => type

  return actionHandler
}
