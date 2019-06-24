// const base = 'https://aquachatapi.azurewebsites.net/api/';
const base = 'https://localhost:44332/api/';
// const base = 'https://localhost:5001/api/';
export const HTTPUrls = {
    test: 'https://localhost:44332/api/user/test',

    getUsersOfChannel: base + 'channel/users',
    //  returns usersdetails list, user_id, workspace_id, channel_id
    putEditChannel: base + 'channel/update',
    // returns string, user_id, workspace_id, channel_id, channel_name, picture_location? , owner_emails?
    postAddChannel: base + 'channel',
    // return string id, user_id, workspace_id, channel_id, channel_name,
    deleteDeleteChannel:  base + 'channel/delete',
    // return string error , user_id, workspace_id, channel_id,
    postAddedUserToChannel: base + 'channel/addUser',
    // return string id or error, user_id, workspace_id, channel_id, add_users
    deleteRemoveUserFromChannel: base + 'channel/removeuser',
    // return string id or error, user_id, workspace_id, channel_id, remove_users
    getGetOwnDetails: base + 'user',
    // return Userdetail, user_id, workspace_id,
    getGetUserID: base + 'user/userID',
    // return string, email
    getGetUserWorkspaces: base + 'user/workspaces',
    // return workspaces[], user_id,
    postAddNewUser: base + 'user',
    // return userId string, display_name, email_address, job_title, last_name
    putEditUser: base + 'user/update',
    // return id or error string, user_id, workspace_id?, display_name, email_address, job_title, last_name
    getGetUsersOfWorkspace: base + 'workspace/users',
    // return userdetails, user_id, workspace_id,
    putEditWorkspace: base + 'workspace/update',
    // return string, user_id, workspace_id, workspace_name, owner_id
    postAddWorkspace: base + 'workspace',
    // return string id or error, user_id, workspace_name, owner_id, add_users
    deleteDeleteWorkspace: base + 'workspace/delete',
    // return error or success string, user_id, workspace_id
    postAddUserToWorkspace: base + 'workspace/user',
    // string[] of users added  , user_id, workspace_id, add_users
    deleteRemoveUserFromWorkspace: base + 'workspace/removeuser',
    // list of users removes, user_id, workspace_id, remove_users
    getAllWorkspace: base + 'workspace',

    getDirectMesssageEmail: base + 'message/emails',

    getDirectMessages: base + 'message/chat',

    getChannelMessages: base + 'message/channel',

    getWorkspaceMessages: base + 'message/workspace',

    postAddPrivilege : base + 'messagechat/addprivilege',

    postRemovePrivilege: base + 'messagechat/removeprivilege',

    postNewChat: base + 'message/chat/new',

    postRemoveUsers: base + 'message/chat/removeusers',

    postSendMessage: base + 'message/send',

    postAddUsersToChat: base + 'message/chat/addusers',

    getChatidEmails: base + 'message/chatid'

}