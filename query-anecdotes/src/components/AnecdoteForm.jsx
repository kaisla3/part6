import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotifDispatch } from '../NotifContext'

const AnecdoteForm = () => {
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({
        type: 'SHORT'
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    dispatch({
      type: 'CREATE',
      payload: content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
