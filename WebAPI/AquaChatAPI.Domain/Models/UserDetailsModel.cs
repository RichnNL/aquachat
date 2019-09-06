using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
   public class UserDetailsModel
    {
        public UserDetailsModel() { }

        public UserModel DefeaultUserDetails { get; set; }
        public WorkspaceDetailsModel[] Workspaces { get; set; }
        
    }
}
