import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}


// import { createContext, useReducer, useEffect } from 'react';

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, user: action.payload };
//     case 'LOGOUT':
//       return { ...state, user: null };
//     case 'SET_ROLE':
//       return { ...state, role: action.payload };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//     role: null
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const role = localStorage.getItem('role');
  
//     if (user) {
//       dispatch({ type: 'LOGIN', payload: user });
//     }
//     if (role) {
//       dispatch({ type: 'SET_ROLE', payload: role });
//     }
//   }, []);

//   console.log('AuthContext state:', state);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
