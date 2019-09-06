using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Domain.Models
{
    public class UserModel
    {
        public string UserId { get; set; }
        public string[] Email { get; set; }
        public string JobTitle { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Language { get; set; }
    }
}
