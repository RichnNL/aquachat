using System;
using AquaChatAPI.Business.Interfaces;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;
using AquaChatAPI.Business.Base;
using System.Linq;
using AquaChatAPI.Business.Helper;
using System.Collections.Generic;
using AquaChatAPI.Business.Services;

namespace AquaChatAPI.Business
{
    public class ChannelStorageBusiness : IChannelBusiness
    {

        private ChannelService ChannelService;
        private UserService UserService;
        public ChannelStorageBusiness(IGenericRepository<UserChannelEntity> userChannelRepository, 
            IGenericRepository<ChannelEntity> channelRepository,
            IGenericRepository<UserEntity> userRepository,
            IGenericRepository<UserEmailEntity> userEmailRepository)
            
        {
            this.ChannelService = new ChannelService(userChannelRepository, channelRepository);
            this.UserService = new UserService(userEmailRepository, userRepository);
        }
        public async Task<ResponseModel> AddUserToChannel(string userId, string workspaceId, string channelId, string[] users)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean userHasPermission = this.ChannelService.UserIsChannelOwner(userId, workspaceId, channelId);

                if (!userHasPermission)
                {
                    responseModel.ErrorMessage.Add("User does not have Permission");
                    return responseModel;
                }

                // Retrieve Channel, Add User to Channel and Update their UserChannel Data
                string[] key = new string[2] { "PartitionKey", "RowKey" };
                string[] value = new string[2] { workspaceId, channelId };
                ChannelEntity channel = this.ChannelService._channelRepository.Get(key, value).Result;

                if (channel != null)
                {
                    List<string> user_emails = channel.Users.Split(",").ToList();

                    foreach (string user in users)
                    {
                        string id = this.UserService.getUserId( user).Result;
                        if (!user_emails.Contains(user)) {
                            user_emails.Add(user);
                        }

                        if (!string.IsNullOrEmpty(id))
                        {
                            this.ChannelService.InsertIntoUserChannel(id, channelId, workspaceId, false);
                        }
                        
                    }
                    //Update Channel Users
                    channel.Users = this.UserService.ToSingleString(user_emails.ToArray());
                    this.ChannelService._channelRepository.Update(channel);

                } else
                {
                    responseModel.ErrorMessage.Add("Error Connecting to Database");
                }



                return responseModel;
            });
          }

        public async Task<ResponseModel> DeleteChannel(string userId, string workspaceId, string channelId)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean userHasPermission = this.ChannelService.UserIsChannelOwner(userId, workspaceId, channelId);

                if (!userHasPermission)
                {
                    responseModel.ErrorMessage.Add("User does not have Permission");
                    return responseModel;
                }

                string[] key = new string[2] { "PartitionKey", "RowKey" };
                string[] value = new string[2] { workspaceId, channelId };
                ChannelEntity channel = this.ChannelService._channelRepository.Get(key, value).Result;
                // Get all Users and Remove their UserChannels
                if (channel != null)
                {
                    List<string> user_emails = channel.Users.Split(",").ToList();

                    foreach (string user in user_emails)
                    {
                        string id = this.UserService.getUserId(user).Result;


                        if (!string.IsNullOrEmpty(id))
                        {
                            this.ChannelService.DeleteUserChannel(id, channelId, workspaceId);
                        }
                        

                    }
                    this.ChannelService._channelRepository.Delete(channel);

                }



                return responseModel;
            });
        }

        public async Task<ResponseModel> EditChannel(ChannelDetailsModel model, string workspaceId ,string userId)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean userHasPermission = this.ChannelService.UserIsChannelOwner(userId, workspaceId, model.Id);

                if (!userHasPermission)
                {
                    responseModel.ErrorMessage.Add("User does not have Permission");
                    return responseModel;
                }

                string[] key = new string[2] { "PartitionKey", "RowKey" };
                string[] value = new string[2] { workspaceId, model.Id };
                ChannelEntity channel = this.ChannelService._channelRepository.Get(key, value).Result;

                if (!string.IsNullOrEmpty(model.Name))
                {
                    channel.Name = model.Name;
                }
                List<string> owners = new List<string>();

                if (model.Users != null)
                {
                    foreach(ChannelUserModel userModel in model.Users)
                    {
                        if (userModel.IsOwner)
                        {
                            owners.Add(userModel.Email);
                        }
                    }
                }

                List<string> CurrentOwners = channel.Owner.Split(",").ToList();

                foreach(string owner_email in owners)
                {
                    string id = this.UserService.getUserId(owner_email).Result;
                    if (!CurrentOwners.Contains(id))
                    {
                        CurrentOwners.Add(id);
                        UserChannelEntity userChannelEntity = new UserChannelEntity();
                        userChannelEntity.ChannelID = model.Id;
                        userChannelEntity.UserID = id;
                        userChannelEntity.WorkspaceID = workspaceId;
                        userChannelEntity.Owner = true;

                        this.ChannelService._userChannelRepository.Update(userChannelEntity);
                    }
                }

                channel.Owner = this.ChannelService.ToSingleString(CurrentOwners.ToArray());

                if (string.IsNullOrWhiteSpace(model.PictureLocation))
                {
                    channel.Picture_Location = model.PictureLocation;
                }

                this.ChannelService._channelRepository.Update(channel);

                responseModel.Message = "Successfully Updated";
                



                return responseModel;
            });
        }

      

        public async Task<ResponseModel> RegisterChannel(ChannelDetailsModel channel,string userid, string workspaceid)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean userInWorkspace = this.UserService.userInWorkspace(userid, workspaceid).Result;

                if (userInWorkspace)
                {
                    
                    if(this.ChannelService.ChannelNameTaken(ref responseModel, workspaceid, channel.Name))
                    {
                        return responseModel;
                    }
                    
                    ChannelEntity channelEntity = this.ChannelService.ToNewChannelEntity(channel);
                    channelEntity.WorkspaceID = workspaceid;

                   
                    string[] ownerIds = this.InsertUserChannelsForAllUsers(channelEntity);
                    if (ownerIds.Length > 0)
                    {
                        channelEntity.Owner = this.ChannelService.ToSingleString(ownerIds);
                    }
                    
                    this.ChannelService._channelRepository.Insert(channelEntity);
                    
                } else
                {
                    responseModel.ErrorMessage.Add("User not found");
                }


                return responseModel;
            });
            // Check if user in workspace

           // Check if name taken
        }

     

        public async Task<ResponseModel> RemoveUserFromChannel(string userId, string workspaceId, string channelId, string[] users)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean userHasPermission = this.ChannelService.UserIsChannelOwner(userId, workspaceId, channelId);

                
                if (!userHasPermission)
                {
                    //
                    if (!this.UserService.isUser(userId, users))
                    {
                        responseModel.ErrorMessage.Add("User does not have Permission");
                        return responseModel;
                    }
                  
                }

                string[] key = new string[2] { "PartitionKey", "RowKey" };
                string[] value = new string[2] { workspaceId, channelId };
                ChannelEntity channel = this.ChannelService._channelRepository.Get(key, value).Result;

                if (channel != null)
                {
                    channel = this.DeleteUserChannelsInChannel(channel, users);
                    this.ChannelService._channelRepository.Update(channel);

                }

                return responseModel;
            });
        }
       
       
        private string[] InsertUserChannelsForAllUsers(ChannelEntity channelEntity)
        {
            string[] userEmails = channelEntity.Users.Split(",");
            string[] ownerEmails = channelEntity.Owner.Split(",");
            foreach (string email in userEmails)
            {
                if (!string.IsNullOrEmpty(email))
                {
                    string userID = this.UserService.getUserId(email).Result;

                    if (!string.IsNullOrWhiteSpace(userID))
                    {
                        this.ChannelService.InsertIntoUserChannel(userID, channelEntity.ChannelId, channelEntity.WorkspaceID, false);
                    }
                }

            }
            List<string> ownerId = new List<string>();
            foreach (string email in ownerEmails)
            {
                if (!string.IsNullOrEmpty(email))
                {
                    string userID = this.UserService.getUserId(email).Result;

                    if (!string.IsNullOrWhiteSpace(userID))
                    {
                        this.ChannelService.InsertIntoUserChannel(userID, channelEntity.ChannelId, channelEntity.WorkspaceID, true);
                    }
                }
            }
            return ownerId.ToArray();
        }

        private ChannelEntity DeleteUserChannelsInChannel(ChannelEntity channel, string[] usersEmails)
        {
            List<string> user_emails = channel.Users.Split(",").ToList();
            List<string> owner_ids = channel.Owner.Split(",").ToList();


            foreach (string user in usersEmails)
            {
                string id = this.UserService.getUserId(user).Result;
                if (!string.IsNullOrEmpty(id))
                {
                    UserChannelEntity entity = new UserChannelEntity();
                    entity.ChannelID = channel.ChannelId;
                    entity.WorkspaceID = channel.WorkspaceID;
                    entity.UserID = id;
                    this.ChannelService._userChannelRepository.Delete(entity);
                }
                if (owner_ids.Contains(id) && owner_ids.Count == 1)
                {

                }
                else if (owner_ids.Contains(id) && owner_ids.Count > 1)
                {
                    owner_ids.Remove(id);
                }

                user_emails.Remove(user);



            }
            channel.Owner = this.ChannelService.ToSingleString(owner_ids.ToArray());
            channel.Users = this.ChannelService.ToSingleString(user_emails.ToArray());
            return channel;
        }



    }
}
