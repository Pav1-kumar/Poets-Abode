import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {title, content}
    // const workout = {title, content, role: user.role}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('');
      setContent('');
      
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Make an Entry</h3>

      <label><b>Title</b></label>
        <input
          placeholder="Post Title"
          name="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
      

      <label><b>Content</b> </label>
        <textarea
          name="body"
          cols="50"
          rows="10"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className={emptyFields.includes('content') ? 'error' : ''}
        />
     

      <button className="btn">Add Post</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm