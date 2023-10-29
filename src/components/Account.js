import React, { createContext } from 'react'
import Pool from '../UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const AccountContext = createContext();

const Account = (props) => {

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject();
                    } else {
                        const attribute = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        const { Name, value } = attribute;
                                        results[Name] = value;
                                    }
                                    resolve(results)
                                 }
                             })
                        })
                        resolve({user, ...session, ...attribute});
                    }
                });
            } else {
                reject();
            }
        })
    }

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            const authDetails = new AuthenticationDetails({ Username, Password });
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.log("onFailure", err)
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequest", data);
                    resolve(data);
                }
            });

        });
    };
    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )

}
export { Account, AccountContext };