import React, { useState } from 'react'
import UserPool from '../UserPool';
import './SignUp.css'
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    // const AWS = require('aws-sdk');

    AWS.config.update({
    region: 'ap-southeast-1', // Replace with your AWS region
    accessKeyId: '', // Replace with your access key ID
    secretAccessKey: '' // Replace with your secret access key
    });

    const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    const onSubmit = async (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("successfully login:", data);
            }
        }); 



        // ADMIN CREATE COGNITO 

        const params = {
            UserPoolId: 'ap-southeast-1_RcUYayLWn', 
            // UserPoolId: "ap-southeast-1_h12cYNvap",
            Username: email, 
            TemporaryPassword: password,
            UserAttributes: [
                {
                Name: 'email',
                Value: email 
                },
                {
                Name: 'custom:mustChangePassword',
                Value: 'true'
                }
            ],
            MessageAction: 'SUPPRESS' 
        };

        cognitoidentityserviceprovider.adminCreateUser(params, function(createUserErr, createUserData) {
            if (createUserErr) {
              console.error('Error creating user:', createUserErr);
            } else {
              console.log('User created successfully:', createUserData);
              
              // After successful creation, send the invitation email
              const resendParams = {
                UserPoolId: 'ap-southeast-1_RcUYayLWn',
                // UserPoolId: "ap-southeast-1_h12cYNvap",
                Username: email,
                MessageAction: 'RESEND'
              };
          
              cognitoidentityserviceprovider.adminCreateUser(resendParams, function(resendErr, resendData) {
                if (resendErr) {
                  console.error('Error resending invitation:', resendErr);
                } else {
                  console.log('Invitation email resent successfully:', resendData);
                }
              });
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