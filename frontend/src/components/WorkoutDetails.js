import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
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
   
    <ul className="admin-posts">
     <li>
      <div className="admin-post-controls">
      <h3 className='list'>{workout.title} <span className="btn-delete btn" onClick={handleClick}>delete</span> </h3>
        
      </div>
    </li>
    </ul>
  )
}

export default WorkoutDetails




// import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// import { useAuthContext } from '../hooks/useAuthContext'

// // date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// const WorkoutDetails = ({ workout }) => {
//   const { dispatch } = useWorkoutsContext()
//   const { user } = useAuthContext()

//   const handleClick = async () => {
//     if (!user || user.role !== 'admin') {
//       return
//     }

//     const response = await fetch('/api/workouts/' + workout._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()

//     if (response.ok) {
//       dispatch({type: 'DELETE_WORKOUT', payload: json})
//     }
//   }

//   return (
   
//    <div className='article-ul'>
//     <h3>{workout.title}</h3>
//     <div className="article">
//       <article>{workout.content}</article>
//       <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
//       {user.role === 'admin' && <span className="material-symbols-outlined" onClick={handleClick}>delete</span>}
//     </div>
//     </div>
//   )
// }

// export default WorkoutDetails
