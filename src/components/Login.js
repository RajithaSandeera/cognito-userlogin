import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';
import './SignUp.css'
import UserPool from '../UserPool';

import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
// import { AmazonCognitoIdentity } from 'aws-sdk'
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password)
            .then(data => {
                console.log("Logged in!", data);
            })
            .catch(err => {
                console.log("Failed to login!", err);
            })
    }
    const onSubmitCode = (event) => {
        event.preventDefault();
        Auth.confirmSignUp('mas.ishara.manage@gmail.com', code)
        .then(data => {
            console.log('Signup confirmed successfully:', data);
        })
        .catch(err => {
            console.error('Error confirming signup:', err);
        });

    }
    const resendCode = (event) => {
        event.preventDefault();
        // const Username = 'mas.ishara.manage@gmail.com'
        // const user = new CognitoUser({ Username, UserPool });
        // user.resendConfirmationCode()

        // const userPool = new CognitoUserPool(UserPool);

        // const userData = {
        // Username: 'mas.ishara.manage@gmail.com',
        // Pool: userPool
        // };

        // const user = new CognitoUser(userData);
        // user.resendConfirmationCode((err, result) => {
        // if (err) {
        //     console.error('Error resending confirmation code:', err);
        // } else {
        //     console.log('Confirmation code resent successfully:', result);
        // }
        // });


        Auth.resendSignUp('mas.ishara.manage@gmail.com')
        .then(data => {
            console.log('Confirmation code resent successfully:', data);
        })
        .catch(err => {
            console.error('Error resending confirmation code:', err);
        });

    }

    
    return (
        <>
            <div className="signup-container">
                <form onSubmit={onSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="signup-container">
                <form onSubmit={resendCode}>
                    <button type="submit">resend Code</button>
                </form>
                <form onSubmit={onSubmitCode}>
                    <label htmlFor='code'>Code</label>
                    <input
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                    />
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </>
    )
}

export default Login