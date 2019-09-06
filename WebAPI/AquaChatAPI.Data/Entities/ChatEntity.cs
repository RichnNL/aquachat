using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Data.Entities
{
   public  class ChatGroupEntity
    {
        public ChatGroupEntity(){}

        public bool IsOwner { get; set; }
        public string ChatId { get; set; }
        public string Name { get; set; }
        public string PictureLocation { get; set; }

        public string SenderId { get; set; }
  
    }
}
