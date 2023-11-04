import React, { useState, useContext } from 'react';
import { AccountContext } from './Account';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

const PasswordChange = () => {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // const { getSession } = useContext(AccountContext);
    
    const onSubmit = (event) => {
        event.preventDefault();
        const Username = 'binance.isharalakshan@gmail.com'; // Replace with the user's username/email
        const user = new CognitoUser({ Username, Pool });

        // Assuming 'newPassword' contains the new password provided by the user
        const newPassword = 'Shan@123'; 
        user.getSession((err, session) => {
            if (err) {
              console.error('Error getting session:', err);
            } else {
              // Use the obtained session for completing the new password challenge
              user.completeNewPasswordChallenge(newPassword, null, {
                onSuccess: (result) => {
                  console.log('Password changed successfully:', result);
                },
                onFailure: (err) => {
                  console.error('Error changing password:', err);
                }
              });
            }
          });
        // getSession().then(({ user }) => {
        //     user.changePassword(password, newPassword, (err, result) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("successfully changes", result);
        //         }
        //     })
        // })
    }
  return (
    <div className="signup-container">
          <form onSubmit={onSubmit}>
              <label>Current Password</label>
              <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
              <label>New Password</label>
              <input value={newPassword} onChange={(event) => setNewPassword(event.target.value)}></input>
              <button type="submit">change Password</button>
          </form>
    </div>
  )
}

export default PasswordChange;