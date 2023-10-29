import React, {useState} from 'react'
import UserPool from '../UserPool';
import './SignUp.css'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        
        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("successfully login:", data);
            }
        }); 
    }
    return (
        <div className="signup-container">
          <form onSubmit={onSubmit}>
              <label htmlFor='email'>Email</label>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                >
                </input>
                <label htmlFor='password'>Password</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                >
                </input>
                <button type="submit">SignUp</button>
            </form>
    </div>
  )
}

export default SignUp