using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AquaChatAPI.Domain.Models
{
    public class WorkspaceUserModel
    {
        public WorkspaceUserModel()
        {
           
        }
        public string JobTitle { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string[] Email { get; set; }
        public Boolean IsOwner { get; set; }
        public string Id { get; set; }
    }
}
