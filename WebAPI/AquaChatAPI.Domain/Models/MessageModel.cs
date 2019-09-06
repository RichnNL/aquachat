using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
    public class MessageModel
    {
        public string Type { get; set; }
        public string Payload { get; set; }

        public string WorkspaceId { get; set; }

        public string ChannelId { get; set; }

        public string SenderId { get; set; }

        public string SenderEmail { get; set; }

        public string Epoch { get; set; }

        public string ChatId {get; set;}
        
    }
}
