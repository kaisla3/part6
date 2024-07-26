import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === '') {
            return anecdotes
        }
        return [...anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) 
    })
    const dispatch = useDispatch()

    const clickVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => clickVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList