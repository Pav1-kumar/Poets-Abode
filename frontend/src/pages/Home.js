import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="admin-posts">
       <div className='li '>
       {workouts && workouts.map((workout) => (
        <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
      {/* {user && user.role === 'admin' && <WorkoutForm />} Only show form if user is admin */}
    </div>
  )
}

export default Home


// return (
//   <div className="home">
//     <div className="workouts">
//        <Author />
//        <div className='articles__heading '>
//        {workouts && workouts.map((workout) => (
//         <h3 key={workout._id}>{workout.title}</h3> 
//       ))}
//       </div>
//     </div>      
//   </div>
// );
// }


// return (
//   <div className="home">
//     <div className="workouts">
//       {workouts && workouts.map((workout) => (
//         <WorkoutDetails key={workout._id} workout={workout} />
//       ))}
//     </div>
//     <WorkoutForm />
//     {/* {user && user.role === 'admin' && <WorkoutForm />} Only show form if user is admin */}
//   </div>
// )
// }