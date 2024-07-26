import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const returned = <div style={style}>{notification}</div>
  return (notification ? returned : '')
}

export default Notification