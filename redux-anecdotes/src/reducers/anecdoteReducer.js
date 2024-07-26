import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const compare = (a, b) => {
  return b.votes - a.votes
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const inOrder = anecdotes.sort(compare)
    dispatch(setAnecdotes(inOrder))
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnec))
  }
}

export const vote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(n => n.id === id)
    const votedAnecdote = { 
      ...anecdote, 
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(id, votedAnecdote)
    const inOrder = anecdotes.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote).sort(compare)

    dispatch(setAnecdotes(inOrder))
  } 
}

export default anecdoteSlice.reducer