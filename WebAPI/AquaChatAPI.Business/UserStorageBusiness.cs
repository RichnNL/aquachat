using System;
using AquaChatAPI.Business.Interfaces;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;
using AquaChatAPI.Business.Base;
using System.Linq;
using AquaChatAPI.Business.Services;
using System.Collections.Generic;

namespace AquaChatAPI.Business
{
    public class UserStorageBusiness :  IUserBusiness
    {
        private UserDetailsService UserDetailsService;
        public UserStorageBusiness(IGenericRepository<UserEntity> userRepository,
            IGenericRepository<UserEmailEntity> userEmailRepository,
            IGenericRepository<WorkspaceEntity> workspaceRepository,
             IGenericRepository<ChannelEntity> channelRepository,
            IGenericRepository<UserChannelEntity> userChannelRepository)
        {
            this.UserDetailsService = new UserDetailsService(userEmailRepository, userRepository, workspaceRepository, channelRepository);
        }

        public async Task<ResponseModel> RegisterUser(UserModel user)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                string error = this.UserDetailsService.UserService.CheckRegistrationError(user);
                if (!string.IsNullOrWhiteSpace(error))
                {
                    responseModel.ErrorMessage.Add(error);
                }
                else
                {
                    if (this.UserDetailsService.UserService.EmailMismatch(user))
                    {
                        responseModel.ErrorMessage.Add("Email Already Taken");
                    }
                    else
                    {
                        UserEntity entity = this.UserDetailsService.UserService.ToEntity(user);
                        entity.WorkSpaceID = "default";

                        Boolean result = this.UserDetailsService.UserService._userRepository.Insert(entity).Result;
                        if (result)
                        {
                            responseModel.Message = "Successfully Added New User";
                            this.UserDetailsService.UserService.AddEmailsToDatabase(entity.Email.Split(","), entity.UserID, ref responseModel);

                        }
                        else
                        {
                            responseModel.ErrorMessage.Add("Failed to Add User In Database");
                        }
                    }

                }
                return responseModel;
            });


        }

        private Boolean idMatchToken(string userID)
        {
            // TODO
            return true;
        }

        public async Task<UserDetailsModel> GetUserDetails(string userID)
        {
            return await Task<UserDetailsModel>.Run(() =>
            {
                if (idMatchToken(userID))
               {
                    UserDetailsModel userDetailsModel = new UserDetailsModel();
                    string[] key = new string[1] { "PartitionKey" };
                    string[] value = new string[1] { userID };
                    UserEntity[] userEntities = this.UserDetailsService.UserService._userRepository.GetAll(key, value).Result.ToArray();
                    List<WorkspaceDetailsModel> workspaceDetails = new List<WorkspaceDetailsModel>();
                    foreach (UserEntity entity in userEntities)
                    {
                        if (entity.WorkSpaceID == "default")
                        {
                            userDetailsModel.DefeaultUserDetails = this.UserDetailsService.UserService.AddUserDefaultToModelFromEntity(userDetailsModel.DefeaultUserDetails, entity);
                        }
                        else
                        {
                            WorkspaceDetailsModel workspaceDetailsModel = this.UserDetailsService.getWorkspaceDetailsModel(entity,userID);
                            if (workspaceDetails != null)
                            {
                                workspaceDetails.Add(workspaceDetailsModel);
                            }
                        }

                    }
                    userDetailsModel.Workspaces = workspaceDetails.ToArray();
                    return userDetailsModel;
                }
                else
                {
                    return null;
                }

            });
        }

    }
}
