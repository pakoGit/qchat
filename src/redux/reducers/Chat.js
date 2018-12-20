const Chat = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state
      }
    case 'TOGGLE_TODO':
      return { ...state }
    default:
      return state
  }
}

export default Chat;