import { useNotifValue } from '../NotifContext'

const Notification = () => {

  const notification = useNotifValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const returned = <div style={style}>{notification}</div>
  return (notification ? returned : '')

}

export default Notification
