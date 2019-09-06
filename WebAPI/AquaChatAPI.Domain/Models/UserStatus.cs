using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
    public class UserStatus
    {
        public string email { get; set; }
        public bool isOnline { get; set; }

        public bool isTyping { get; set; }
    }
}
