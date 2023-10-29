import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "ap-southeast-1_h12cYNvap",
    ClientId: "otb3tn5lcs33on43j66d1ua28"
}

export default new CognitoUserPool(poolData);
