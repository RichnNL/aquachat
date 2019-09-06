using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Business.Interfaces;
using AquaChatAPI.Business.Services;

namespace AquaChatAPI.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private IMessageBusiness _messageBusiness;
      
        public MessageController(IMessageBusiness messageBusiness)
        {
            this._messageBusiness = messageBusiness;
        
        }

        [Route("file")]
        [HttpPost]
        public ActionResult<string> AddFiles()
        {
            return "Success";
        }

        [Route("chat")]
        [HttpGet]
        public async Task<IEnumerable<MessageModel>> GetDirectMessages([FromQuery] string userid, [FromQuery] string chatid)
        {
            return await this._messageBusiness.GetDirectMessages(userid, chatid);
        }

        [Route("emails")]
        [HttpGet]
        public async Task<IEnumerable<MessageModel>> GetDirectMessagesFromEmails([FromQuery] string userid, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.GetDirectMessagesFromEmails(userid, emails);
        }

        [Route("chatid")]
        [HttpGet]
        public async Task<ResponseModel> GetChatIdFromEmails([FromQuery] string userid, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.GetChatIdFromEmails(userid, emails);
        }


        [Route("allmessages")]
        [HttpGet]
        public async Task<IEnumerable<MessageModel>> GetAllDirectMessages([FromQuery] string userid)
        {
            return await this._messageBusiness.GetAllDirectMessages(userid);
        }

        [Route("channel")]
        [HttpGet]
        public async Task<IEnumerable<MessageModel>> GetChannelMessages([FromQuery] string userid, [FromQuery] string channel_Id, [FromQuery] string workspace_id)
        {
            return await this._messageBusiness.GetChannelMessages(userid, workspace_id, channel_Id);
        }

        [Route("workspace")]
        [HttpGet]
        public async Task<IEnumerable<MessageModel>> GetWorkspaceMessages([FromQuery] string userid, [FromQuery] string workspace_id)
        {
            return await this._messageBusiness.GetWorkspaceMessages(userid, workspace_id);
        }
        [Route("chat/addprivilege")]
        [HttpPost]
        public async Task<ResponseModel> PostAddPrivilege([FromBody]  ChatModel model, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.AddOwnerToChat(model, emails);
        }

        [Route("chat/removeprivilege")]
        [HttpPost]
        public async Task<ResponseModel> PostRemoveMessages([FromBody]  ChatModel model, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.RemoveOwnerFromChat(model, emails);
        }

        [Route("chat/new")]
        [HttpPost]
        public async Task<ResponseModel> PostNewChatMessages([FromBody]  ChatModel model, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.NewChat(model, emails);
        }

        [Route("chat/removeusers")]
        [HttpPost]
        public async Task<ResponseModel> PostRemoveUsersFromChat([FromBody]  ChatModel model, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.RemoveUsersFromChat(model, emails);
        }

        [Route("send")]
        [HttpPost]
        public async Task<ResponseModel> PostMessage([FromBody]  MessageModel message)
        {
            return await this._messageBusiness.PostMessages(message);
        }

        [Route("chat/addusers")]
        [HttpPost]
        public async Task<ResponseModel> AddUsersToChat([FromBody]  ChatModel model, [FromQuery] string[] emails)
        {
            return await this._messageBusiness.AddUsersToChat(model, emails);
        }
    }
}
