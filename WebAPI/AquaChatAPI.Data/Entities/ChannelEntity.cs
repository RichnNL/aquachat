using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace AquaChatAPI.Data.Entities
{
    public class ChannelEntity 
    {
        public ChannelEntity()
        {

        }

        public string WorkspaceID { get; set; }

        public string ChannelId { get; set; }
        public string Name { get; set; }
        public string Picture_Location { get; set; }
        public string Users { get; set; }
        public string Owner { get; set; }

       
    }
}
