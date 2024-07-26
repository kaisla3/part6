import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATE":
          return `anecdote '${action.payload}' created`
      case "VOTE":
          return `anecdote '${action.payload}' voted`
      case "SHORT":
          return 'too short anecdote, must have length 5 or more'
      case "RESET":
          return ''
      default:
          return state
    }
  }

const NotifContext = createContext()


export const NotifContextProvider = (props) => {
    const [notification, notifDispatch] = useReducer(notificationReducer, '')
  
    return (
      <NotifContext.Provider value={[notification, notifDispatch]}>
        {props.children}
      </NotifContext.Provider>
    )
  }

export const useNotifValue = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[0]
  }
  
export const useNotifDispatch = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[1]
  }

export default NotifContext