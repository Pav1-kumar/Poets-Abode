import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Navbar from './components/Navbar'
import Header from "./components/Header"
import MainPage from './pages/MainPage'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
           <Route 
            path='/'
            element= {user ?  <MainPage/> : <Navigate to="/login" />}
           />
            <Route 
              path="/home" 
              element={user ? <Home /> : <Navigate to="/login" />} 
              // element={user && user.role === 'admin' ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
