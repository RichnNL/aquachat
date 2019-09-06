using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AquaChatAPI.Business.Interfaces;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Repository.Interface;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Business.Helper;
using AquaChatAPI.Business.Base;
using System.Linq;
using AquaChatAPI.Business.Services;
namespace AquaChatAPI.Business
{
   public class MessageStorageBusiness :  IMessageBusiness
    {
        private MessageService MessageService;
        private UserService UserService;
        private Chat chat;
        public MessageStorageBusiness(IGenericRepository<DirectMessageEntity> directMessageRepository,
         IGenericRepository<WorkspaceMessageEntity> workspaceMessageRepository,
         IGenericRepository<ChannelMessageEntity> channelMessageRepository,
         IGenericRepository<UserEntity> userRepository,
         IGenericRepository<UserEmailEntity> userEmailRepository,
         IGenericRepository<ChatGroupEntity> chatGroupRepository,
         IGenericRepository<UserChannelEntity> userChannelRepository)
        {
            this.MessageService = new MessageService(directMessageRepository,
                workspaceMessageRepository, 
                channelMessageRepository, 
                chatGroupRepository, 
                userEmailRepository,
                userChannelRepository,
                userRepository);
                this.UserService = new UserService(userEmailRepository, userRepository);
                this.chat = new Chat(directMessageRepository, workspaceMessageRepository, channelMessageRepository,
                userRepository, userEmailRepository, userChannelRepository, chatGroupRepository);
        }

        public Task<ResponseModel> AddOwnerToChat(ChatModel model, string[] newOwnersEmails)
        {
            return this.MessageService.addOwner(model, newOwnersEmails);
        }

        public Task<ResponseModel> AddUsersToChat(ChatModel model, string[] emails)
        {
            return this.MessageService.AddUsersToChat(model, emails);
        }

        public async Task<IEnumerable<MessageModel>> GetChannelMessages(string userID, string workspaceId, string channelId)
        {
            return await Task<MessageModel>.Run(async () =>
            {
                Boolean exists = this.UserService.userExists(userID);
                if (exists)
                {
                    return await this.MessageService.getChannelMessage(workspaceId, channelId);
                }
                else
                {
                    return null;
                }
            });
        }
        public async Task<IEnumerable<MessageModel>> GetAllDirectMessages(string userID)
        {
            return await Task<MessageModel>.Run(() =>
            {
                return this.MessageService.getDirectMessages(userID);
            });
        }
        public async Task<IEnumerable<MessageModel>> GetDirectMessages(string userID, string chatid)
        {
            return await Task<MessageModel>.Run(() =>
            {
                return this.MessageService.getChatDirectMessage(userID, chatid);
            });
          }

        public async Task<IEnumerable<MessageModel>> GetWorkspaceMessages(string userID, string workspaceId)
        {
            return await Task<MessageModel>.Run(async () =>
            {
                Boolean exists = this.UserService.userExists(userID);
                if (exists)
                {
                    return await this.MessageService.getWorkspaceMessage(workspaceId);
                }
                else
                {
                    return null;
                }
            });
        }

        public async Task<ResponseModel> NewChat(ChatModel model, string[] emails)
        {
          return await  this.MessageService.startNewChat(model, emails);
        }

        public async Task<ResponseModel> PostMessages(MessageModel message)
        {
            return await Task<ResponseModel>.Run(() =>
            {
                ResponseModel responseModel = new ResponseModel();

                Boolean exists = this.UserService.userExists(message.SenderId);
                if (exists)
                {
                    this.chat.sendMessage(message);
         
                     responseModel.Message = "Successful";
                    
                   
                }
                
                return responseModel;
            });
        }

        public async Task<ResponseModel> RemoveOwnerFromChat(ChatModel model, string[] ownersEmails)
        {
            return await this.MessageService.RemoveOwnerFromChat(model, ownersEmails);
        }

        public async Task<ResponseModel> RemoveUsersFromChat(ChatModel model, string[] emails)
        {
            return await this.MessageService.RemoveUsersFromChat(model, emails);
        }

        public async Task<IEnumerable<MessageModel>> GetDirectMessagesFromEmails(string userID, string[] emails)
        {
            return await Task<MessageModel>.Run(async () =>
            {
                Boolean exists = this.UserService.userExists(userID);
                if (exists)
                {
                    return await this.MessageService.getDirectMessageFromEmails(userID, emails);
                }
                else
                {
                    return null;
                }
            });
        }

        public async Task<ResponseModel> GetChatIdFromEmails(string userID, string[] emails)
        {
            return await Task<ResponseModel>.Run(async () =>
            {
                Boolean exists = this.UserService.userExists(userID);
                if (exists)
                {
                    return await this.MessageService.getChatIdFromEmails(userID, emails);
                }
                else
                {
                    return null;
                }
            });
        }


    }
}
