
export const AzureConfiguration = {
    clientID: 'ccf4dd20-9c73-4928-bbf5-07ab03149eb0',
    signUpSignInPolicy: 'B2C_1_Login_2',
    b2cScopesAPI: [
        'https://AquaChat.onmicrosoft.com/api/write',
        'https://AquaChat.onmicrosoft.com/api/read'
    ],
    b2cScopes: [
        'https://AquaChat.onmicrosoft.com/app/write',
        'https://AquaChat.onmicrosoft.com/app/read',
        'https://AquaChat.onmicrosoft.com/app/openId',
        'https://AquaChat.onmicrosoft.com/app/user_impersonation'
    ],
    authority: 'https://AquaChat.b2clogin.com/AquaChat.onmicrosoft.com/b2c_1_login_2',
    extraQueryParameter: 'p=B2C_1_Login_2&scope=openid&nux=1',
    id_access_token_lifetime: 3600000,
    mobielRedirect: 'aquachat.b2clogin.com://auth/',
    editPolicy: 'https://AquaChat.b2clogin.com/AquaChat.onmicrosoft.com/B2C_1_EditProfile',
    options: {
        postLogoutRedirectUri: 'https://aquadischatapp.nl',
        validateAuthority: false,
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
        redirectUri: 'https://aquadischatapp.nl/'
        }
};
