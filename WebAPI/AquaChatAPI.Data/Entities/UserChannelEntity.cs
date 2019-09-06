using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Data.Entities
{
    public class UserChannelEntity
    {
        public UserChannelEntity()
        {

        }

        public string JoinDate { get; set; }

        public Boolean Owner { get; set; }

        public string UserID { get; set; }

        public string WorkspaceID { get; set; }

        public string ChannelID { get; set; }

    }
}
