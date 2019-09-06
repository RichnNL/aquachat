using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
   public class WorkspaceModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public string PictureLocation { get; set; }

        public string[] Owners { get; set; }
        public string Creator { get; set; }
    }
}
