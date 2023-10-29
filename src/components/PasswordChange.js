import React, { useState, useContext } from 'react';
import { AccountContext } from './Account';

const PasswordChange = () => {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { getSession } = useContext(AccountContext);
    
    const onSubmit = (event) => {
        event.preventDefault();

        getSession().then(({ user }) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("successfully changes", result);
                }
            })
        })
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