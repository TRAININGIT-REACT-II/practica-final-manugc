// Usuarios
const actions = ['UPDATE_ID', 'UPDATE_NAME']

const userActionTypes = {}
actions.forEach((action) => {
  userActionTypes[action] = action
})

export { userActionTypes as default }
