using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
    public class ChannelUserModel
    {
        public string Email { get; set; }
        public Boolean IsOwner { get; set; }
    }
}
