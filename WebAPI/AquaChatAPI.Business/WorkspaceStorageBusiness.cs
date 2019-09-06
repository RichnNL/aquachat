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
    public class WorkspaceStorageBusiness : IWorkspaceBusiness
    {

        private WorkspaceService WorkspaceService;
        private UserService UserService;
        public WorkspaceStorageBusiness(IGenericRepository<WorkspaceEntity> repository,
            IGenericRepository<UserEmailEntity> userEmailRepository,
            IGenericRepository<UserEntity> userRepository
            )
        {
            this.WorkspaceService = new WorkspaceService(repository);
            this.UserService = new UserService(userEmailRepository, userRepository);
        }

        public async Task<ResponseModel> AddUserToWorkspace(string userId, string workspaceId, string[] users)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean canEditWorkspace = true;
                //this.userOwnerOfWorkspace(this._workspaceRepository, userId, workspaceId).Result;
                if (!canEditWorkspace)
                {
                    responseModel.ErrorMessage.Add("User does not have permission");
                }
                else
                {
                    string[] key = new string[1] { "PartitionKey" };
                    string[] value = new string[1] { workspaceId };
                    WorkspaceEntity workspaceEntity = this.WorkspaceService._workspaceRepository.Get(key, value).Result;
                    if (workspaceEntity.Users == null)
                    {
                        workspaceEntity.Users = "";
                    }

                    workspaceEntity = this.InsertUsersEntityForWorkspaceUsers(workspaceEntity, users);

                    bool updated = this.WorkspaceService._workspaceRepository.Update(workspaceEntity).Result;
                    if (updated)
                    {
                        responseModel.Message = "Successfully Added";
                    }
                    else
                    {
                        responseModel.ErrorMessage.Add("Error Adding Uusers");
                    }
                }
                return responseModel;
            });
        }

        public async Task<ResponseModel> DeleteWorkspace(string userId, string workspaceId)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                if (string.IsNullOrWhiteSpace(userId))
                {
                    responseModel.ErrorMessage.Add("Missing User Id");
                    return responseModel;
                }
                if (string.IsNullOrWhiteSpace(workspaceId))
                {
                    responseModel.ErrorMessage.Add("Missing WorkspaceId");
                    return responseModel;
                }
                Boolean canEditWorkspace = this.WorkspaceService.userOwnerOfWorkspace(userId, workspaceId).Result;
                if (canEditWorkspace)
                {
                    string[] key = new string[1] { "ParitionKey" };
                    string[] value = new string[1] { workspaceId };
                    WorkspaceEntity retrievedWorkspace = this.WorkspaceService._workspaceRepository.Get(key, value).Result;

                    if (retrievedWorkspace != null)
                    {

                        this.DeleteUserEntitiesInWorkspace(retrievedWorkspace, ref responseModel);

                        Boolean deleted = this.WorkspaceService._workspaceRepository.Delete(retrievedWorkspace).Result;
                        if (deleted)
                        {
                            responseModel.Message = "Successfully Deleted";
                        }
                        else
                        {
                            responseModel.ErrorMessage.Add("Error Deleting");
                        }
                    }
                }
                else
                {
                    responseModel.ErrorMessage.Add("User does not have permission");
                    return responseModel;
                }
                return responseModel;

            });
        }

        public async Task<ResponseModel> EditWorkspace(WorkspaceModel model)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                if (string.IsNullOrWhiteSpace(model.Creator))
                {
                    responseModel.ErrorMessage.Add("Missing User Id");
                    return responseModel;
                }
                if (string.IsNullOrWhiteSpace(model.Id))
                {
                    responseModel.ErrorMessage.Add("Missing WorkspaceId");
                    return responseModel;
                }
                Boolean canEditWorkspace = this.WorkspaceService.userOwnerOfWorkspace(model.Creator, model.Id).Result;
                if (canEditWorkspace)
                {
                    string[] key = new string[1] { "ParitionKey" };
                    string[] value = new string[1] { model.Id };
                    WorkspaceEntity retrievedWorkspace = this.WorkspaceService._workspaceRepository.Get(key, value).Result;
                    retrievedWorkspace = this.EditWorkspaceFromModel(retrievedWorkspace, model);

                    this.WorkspaceService._workspaceRepository.Update(retrievedWorkspace);
                }
                else
                {
                    responseModel.ErrorMessage.Add("User does not have permission");
                    return responseModel;
                }
                return responseModel;

            });
        }

        public async Task<ResponseModel> RegisterWorkspace(WorkspaceModel workspace)
        {
            return await Task<ResponseModel>.Run(async () =>
            {
                ResponseModel responseModel = new ResponseModel();
                string error = this.CheckWorkspace(workspace);

                if (!string.IsNullOrWhiteSpace(error))
                {
                    responseModel.ErrorMessage.Add(error);
                }
                else
                {
                    bool workspaceNameTaken = await this.WorkspaceService.WorkspaceExist(workspace.Name);

                    if (workspaceNameTaken)
                    {
                        responseModel.ErrorMessage.Add("Workspace Name Taken");
                    }
                    else
                    {
                        WorkspaceEntity workspaceEntity = this.toWorkspaceEntity(workspace);

                        bool result = await this.WorkspaceService._workspaceRepository.Insert(workspaceEntity);

                        if (result)
                        {
                            responseModel.Message = workspaceEntity.Workspace_ID;
                            this.InsertUserEntityForOwners(workspaceEntity, ref responseModel);
                        }
                        else
                        {
                            responseModel.ErrorMessage.Add("Failed to Add Workspace to Database");
                        }
                    }
                }

                return responseModel;
            });

        }

        public async Task<ResponseModel> RemoveUserFromWorkspace(string userId, string workspaceId, string[] users)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();
                Boolean canEditWorkspace = this.WorkspaceService.userOwnerOfWorkspace(userId, workspaceId).Result;
                if (!canEditWorkspace)
                {
                    canEditWorkspace = this.UserService.isUser(userId, users);
                    if (!canEditWorkspace)
                    {
                        responseModel.ErrorMessage.Add("User Does not have permission");
                    }

                }
                else
                {
                    string[] key = new string[1] { "Partition" };
                    string[] value = new string[1] { workspaceId };
                    WorkspaceEntity workspaceEntity = this.WorkspaceService._workspaceRepository.Get(key, value).Result;

                    workspaceEntity = this.RemoveUserEntitiesOfWorkspace(workspaceEntity, users, ref responseModel);

                    bool updated = this.WorkspaceService._workspaceRepository.Update(workspaceEntity).Result;
                    if (updated)
                    {
                        responseModel.Message = "Successfully Removed Users";

                    }
                    else
                    {
                        responseModel.ErrorMessage.Add("Error Deleting Users");
                    }
                }
                return responseModel;
            });
        }

        private string CheckWorkspace(WorkspaceModel workspace)
        {
            string error = "";
            if (string.IsNullOrWhiteSpace(workspace.Name))
            {
                error = error + "Workspace Name Is Empty";
            }
            if (workspace.Owners == null)
            {
                this.WorkspaceService.errorMessage(ref error);
                error = error + "No Owners Given";
            }
            return error;
        }
        private WorkspaceEntity toWorkspaceEntity(WorkspaceModel workspaceModel)
        {
            Generator generator = new Generator();
            WorkspaceEntity workspaceEntity = new WorkspaceEntity();

            workspaceEntity.Workspace_ID = generator.GeneratateID();
            workspaceEntity.Epoch = generator.getEpoch();

            workspaceEntity.Name = workspaceModel.Name;
            List<string> owners = new List<string>();
            
            owners.Add(workspaceModel.Creator);
            workspaceEntity.Users = this.WorkspaceService.ToSingleString(workspaceModel.Owners);
            foreach (string owner_email in workspaceModel.Owners)
            {
                string id = this.UserService.getUserId(owner_email).Result;

                if (!string.IsNullOrWhiteSpace(id) && !owners.Contains(id))
                {
                    owners.Add(id);
                }
            }
            workspaceEntity.Owner = this.WorkspaceService.ToSingleString(owners.ToArray());
            return workspaceEntity;
        }

        private WorkspaceEntity InsertUsersEntityForWorkspaceUsers(WorkspaceEntity workspaceEntity, string[] users)
        {
            List<string> retrievedUsers = workspaceEntity.Users.Split(",").ToList();
            foreach (string user_email in users)
            {
                if (!retrievedUsers.Contains(user_email))
                {
                    string[] Key = new string[1] { "RowKey" };
                    string[] Value = new string[1] { user_email };
                    bool userExists = this.UserService._userEmailRepository.Exists(Key, Value).Result;

                    if (userExists)
                    {
                        retrievedUsers.Add(user_email);
                        UserEntity user = new UserEntity();
                        string id = this.UserService.getUserId(user_email).Result;
                        user.UserID = id;
                        user.WorkSpaceID = workspaceEntity.Workspace_ID;
                        Boolean added = this.UserService._userRepository.Insert(user).Result;
                    }

                }
            }
            workspaceEntity.Users =  this.WorkspaceService.ToSingleString(retrievedUsers.ToArray());
            return workspaceEntity;
        }
        private void DeleteUserEntitiesInWorkspace(WorkspaceEntity workspaceEntity, ref ResponseModel responseModel)
        {
            string[] users = workspaceEntity.Users.Split(",").ToArray();
            foreach (string user in users)
            {
                string id = this.UserService.getUserId(user).Result;
                if (!string.IsNullOrWhiteSpace(id))
                {
                    UserEntity userEntity = new UserEntity();
                    userEntity.UserID = id;
                    userEntity.WorkSpaceID = workspaceEntity.Workspace_ID;
                    Boolean deleted = this.UserService._userRepository.Delete(userEntity).Result;
                    if (!deleted)
                    {
                        responseModel.ErrorMessage.Add(user + " Not Deleted");
                    }
                }
            }
        }

        private WorkspaceEntity EditWorkspaceFromModel(WorkspaceEntity workspaceEntity, WorkspaceModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                workspaceEntity.Name = model.Name;
            }
            if (string.IsNullOrWhiteSpace(model.PictureLocation))
            {
                workspaceEntity.PictureLocation = model.PictureLocation;
            }

            if (model.Owners != null)
            {
                List<string> retrievedOwners = workspaceEntity.Owner.Split(",").ToList();
                foreach (string owner in model.Owners)
                {
                    if (!retrievedOwners.Contains(owner))
                    {
                        string ownerId = this.UserService.getUserId(owner).Result;
                        if (!string.IsNullOrWhiteSpace(ownerId))
                        {
                            retrievedOwners.Add(ownerId);
                        }
                    }
                }

            }
            return workspaceEntity;
        }
        private void InsertUserEntityForOwners(WorkspaceEntity workspaceEntity, ref ResponseModel responseModel)
        {
            string[] owners = workspaceEntity.Owner.Split(",");
            foreach (string owner_id in owners)
            {
                UserEntity userEntity = new UserEntity();
                userEntity.UserID = owner_id;
                userEntity.WorkSpaceID = workspaceEntity.Workspace_ID;

                bool inserted = this.UserService._userRepository.Insert(userEntity).Result;
                if (!inserted)
                {
                    responseModel.ErrorMessage.Add("Failed To Add An Owner to Workspace");
                }
            }
        }

        private WorkspaceEntity RemoveUserEntitiesOfWorkspace(WorkspaceEntity workspaceEntity, string[] users, ref ResponseModel responseModel)
        {
            List<string> retrievedUsers = workspaceEntity.Users.Split(",").ToList();
            List<string> owners = workspaceEntity.Owner.Split(",").ToList();
            foreach (string user_email in users)
            {
                retrievedUsers.Remove(user_email);

                UserEntity user = new UserEntity();
                string id = this.UserService.getUserId(user_email).Result;
                user.UserID = id;
                user.WorkSpaceID = workspaceEntity.Workspace_ID;
                Boolean canDelete = true;
                if (owners.Contains(id))
                {
                    if (owners.Count == 1)
                    {
                        responseModel.ErrorMessage.Add(" Cannot Delete" + user_email + " they are the last Owner of Workspace");
                        canDelete = false;
                    }
                    else
                    {
                        owners.Remove(id);
                        workspaceEntity.Owner = this.WorkspaceService.ToSingleString(owners.ToArray());
                    }
                }
                if (canDelete)
                {
                    Boolean deleted = this.UserService._userRepository.Delete(user).Result;
                }
            }
            workspaceEntity.Users = this.WorkspaceService.ToSingleString(retrievedUsers.ToArray());
            return workspaceEntity;
        }

        public async Task<WorkspaceModel[]> GetWorkspacesByName(string userId, string search)
        {
            return await Task<WorkspaceModel[]>.Run(() =>
            {
                string[] Key = new string[1] { "PartitionKey" };
                string[] Value = new string[1] { userId };
                bool userExists = this.UserService._userEmailRepository.Exists(Key, Value).Result;
                List<WorkspaceModel> workspaceModels = new List<WorkspaceModel>();
                if (userExists)
                {
                    WorkspaceEntity[] workspaceEntities = this.WorkspaceService._workspaceRepository.GetAllAsync().Result.ToArray();
                    foreach(WorkspaceEntity entity in workspaceEntities)
                    {
                        string workspaceName = entity.Name.ToLower();
                        string searchName = "";
                        if (!string.IsNullOrWhiteSpace(search))
                        {
                            searchName = search.ToLower();
                        }

                        if (string.IsNullOrWhiteSpace(search) || !workspaceName.Contains(searchName))
                        {
                            WorkspaceModel model = this.WorkspaceService.entitytoWorkspaceModel(entity);
                           
                            bool userInWorkspace = this.UserService.userInWorkspace(userId, model.Id).Result;
                                if (!userInWorkspace)
                                {
                                    workspaceModels.Add(model);
                                }
                        }
                    }
                }
                

             return workspaceModels.ToArray();

            });
        }

        public async Task<bool> WorkspaceNameTaken(string name)
        {
            return await Task<bool>.Run(async () =>
            {
                return await this.WorkspaceService.WorkspaceExist(name);
            });
         }

    }
}
