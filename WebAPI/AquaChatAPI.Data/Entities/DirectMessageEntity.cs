using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AquaChatAPI.Data.Entities
{
    public class DirectMessageEntity
    {
        public DirectMessageEntity()
        {

        }
     
        public string Message { get; set; }
        public string Location { get; set; }

        public string SenderEmail { get; set; }

        public string Epoch { get; set; }

        public string Type { get; set; }

        public string ChatId { get; set; }

    }
}
