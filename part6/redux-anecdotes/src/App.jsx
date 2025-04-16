import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => {
    return state.length > 0 ? state.sort((a, b) => b.votes - a.votes) : state
  })
  
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', data: { id } })
    console.log('vote', id)
  }

  const handleCreate = (event) => {
    event.preventDefault()
    console.log(event)
    const anecdote = event.target[0].value
    dispatch({ type: 'ADD', data: { content: anecdote, votes: 0 } })
    event.target[0].value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App