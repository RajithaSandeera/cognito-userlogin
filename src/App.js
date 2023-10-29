import SignUp from './components/SignUp';
import './App.css';
import Login from './components/Login';
import { Account } from './components/Account';
import Status from './components/Status';
import PasswordChange from './components/PasswordChange';

const App = () => {
  return <Account>
    <Status/>
    <SignUp />
    <Login />
    <PasswordChange/>
    </Account>
  
}

export default App;
