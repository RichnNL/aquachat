using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AquaChatAPI.Domain.Models
{
    public class WorkspaceDetailsModel
    {
        public WorkspaceDetailsModel(){ }
        public string Id { get; set; }
        public string Name { get; set; }

        public string PictureLocation { get; set; }

        public Boolean IsOwner { get; set; }

        public WorkspaceUserModel[] Users { get; set; }

        public ChannelDetailsModel[] Channels { get; set; }
    }
}
