import React from 'react';
import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import MainWorkoutDetails from '../components/MainWorkoutDetails'


const MainPage = () => {
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


    const Author = () => {
    return (
      <div className="author">
        <h1 className="author__heading">Poet's Abode</h1>
        <p className="author__body">Welcome, to the House of Literature</p>
      </div>
    );
  };

  return (
    <div className="home">
      <div className="">
         <Author />
         <div className='article'>
         {workouts && workouts.map((workout) => (
          <MainWorkoutDetails key={workout._id} workout={workout} />
        ))}
        </div>
      </div>      
    </div>
  );
}


export default MainPage;



// {workouts &&
//   workouts.map((workout) => (
//     <h3 key={workout._id}>{workout.title}</h3> // Only display title
//   ))}

//   return (
//     <div className="home">
//       <div className="workouts">
//          <Author />
//          {workouts && workouts.map((workout) => (
//           <WorkoutDetails key={workout._id} workout={workout} />
//         ))}
//       </div>      
//     </div>
//   );
// }







// import React, { useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from "../hooks/useAuthContext";

// const Home = () => {
//   const { workouts, dispatch } = useWorkoutsContext();
//   const { user } = useAuthContext(); // Get the user from AuthContext

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       // Define the URL based on the user's role
//       const url = user && user.role === 'admin' ? '/api/workouts/all' : '/api/workouts';
//       const response = await fetch(url); // Fetch without the authorization header
//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'SET_WORKOUTS', payload: json });
//       }
//     };

//     fetchWorkouts(); // Call fetchWorkouts regardless of user being logged in
//   }, [dispatch, user]);

//   return (
//     <div className="home">
//       <div className="workouts">
//         {workouts.map((workout) => ( // Assuming workouts is an array
//           <div key={workout._id}> {/* Use a unique key for each workout */}
//             <h3>{workout.title}</h3>
//             <article>{workout.content}</article>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
