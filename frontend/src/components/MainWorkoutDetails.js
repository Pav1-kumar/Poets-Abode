import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MainWorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('https://poets-abode-backend.onrender.com/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
   
   <div className='article-ul'>
    <h3>{workout.title}</h3>
    <div className="article">
      <article>{workout.content}</article>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    </div>
    </div>
  )
}

export default MainWorkoutDetails



