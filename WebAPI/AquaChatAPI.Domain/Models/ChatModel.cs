using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
    public class ChatModel
    {
        public string ChatId { get; set; }
        public string Picture { get; set; }

        public string Name { get; set; }

        public Boolean isOwner { get; set; }

        public string SenderId { get; set; }

        public string SenderEmail { get; set; }
    }
}
