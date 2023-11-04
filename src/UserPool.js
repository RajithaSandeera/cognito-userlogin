import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "ap-southeast-1_RcUYayLWn",
    ClientId: "o8pa0qbrvg8p4jmjd1f1sp41a"
}

export default new CognitoUserPool(poolData);
