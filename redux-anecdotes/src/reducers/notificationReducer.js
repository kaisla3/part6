import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
      setMessage(state, action) {
        return action.payload
      },
      removeMessage(state) {
        const message = ''
        state = message
          return state
        },
      },
    })
  
  export const { setMessage, removeMessage } = notificationSlice.actions

  export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(removeMessage())
        }, time * 1000)
      } 
  }

  export default notificationSlice.reducer