/* @flow */
// analysis options setup actions
export const Analysis = {
  add: 'analysisAdd',
  remove: 'analysisRemove',
  modify: 'analysisModify',
  toggle: 'analysisToggle'
}

// auth actions
export const Auth = {
  login: 'authLogin',
  logout: 'authLogout',
  request: 'authRequest'
}

// netlist manipulation actions
export const Netlists = {
  uploadRequest: 'netlistUploadRequest',
  upload: 'netlistUpload',
  simulateRequest: 'netlistSimulateRequest'
}

// notification related actions
export const Notification = {
  close: 'noificationClose',
  request: 'notificationRequest',
  show: 'notificationShow'
}

// outputs setup actions
export const Output = {
  add: 'outputAdd',
  remove: 'outputRemove',
  modify: 'outputModify',
  toggle: 'outputToggle'
}

// simulation related actions
export const Simulations = {
  startRequest: 'simulationStartRequest',
  start: 'simulationStart',
  stop: 'simulationStop',
  statusRequest: 'simulationStatusRequest',
  status: 'simulationStatus'
}
