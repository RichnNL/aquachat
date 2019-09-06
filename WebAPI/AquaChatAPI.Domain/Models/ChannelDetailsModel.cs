using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AquaChatAPI.Domain.Models
{   
    public class ChannelDetailsModel
    {
        public ChannelDetailsModel(){ }
        public string Id { get; set; }
        public string Name { get; set; }
        public string PictureLocation { get; set; }
        public ChannelUserModel[] Users { get; set; }

    }
    
}
