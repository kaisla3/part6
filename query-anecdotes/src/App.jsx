import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotifDispatch } from './NotifContext'

const App = () => {
  const dispatch = useNotifDispatch()

  const queryClient = useQueryClient()

  const updateAnecMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      payload: anecdote.content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const compare = (a, b) => {
    return b.votes - a.votes
  }

  const anecdotes = result.data

  const inOrder = anecdotes.sort(compare)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {inOrder.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
