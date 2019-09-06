using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Business.Interfaces;

namespace AquaChatAPI.Controllers
{
    [Route("api/channel")]
    [ApiController]
    public class ChannelController : ControllerBase
    {

        private IChannelBusiness _channelBusiness;
        public ChannelController(IChannelBusiness channelBusiness)
        {
            this._channelBusiness = channelBusiness;
        }


        [HttpPost]
        public async Task<ResponseModel> RegisterChannel([FromQuery] string userid, [FromQuery] string workspaceid, [FromBody] ChannelDetailsModel channelDetails  )
        {
            return await this._channelBusiness.RegisterChannel(channelDetails, userid, workspaceid);
        }




    }




}
