import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

return ( 
 <header className="header">
  <Link to="/" className="header__logo">🔅🌷</Link>

  <nav className="header__nav">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/home">Account</Link>
      </li>
    

    {/* <nav> */}
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        {/* </nav> */}
        </ul>

  </nav>

  {/* <div className="header__button">

 </div> */}

</header>
);

}
 
export default Header;