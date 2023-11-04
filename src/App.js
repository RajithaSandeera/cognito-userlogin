import SignUp from './components/SignUp';
import './App.css';
import Login from './components/Login';
import { Account } from './components/Account';
import Status from './components/Status';
import PasswordChange from './components/PasswordChange';
import Pool from './UserPool';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'ap-southeast-1', // Replace with your AWS region
    userPoolId: 'ap-southeast-1_RcUYayLWn', // Your Cognito User Pool ID
    userPoolWebClientId: 'o8pa0qbrvg8p4jmjd1f1sp41a' // Your Cognito User Pool Client ID
  },
});
const App = () => {
  const user = Pool.getCurrentUser();
  console.log('const user = Pool.getCurrentUser();', user)
  return <Account>
    <div style={{ display: 'flex' }}>
      <Status/>
      <SignUp />
      <Login />
      <PasswordChange/>

    </div>
    </Account>
  
}

export default App;

    