using System;
using System.Collections.Generic;
using System.Text;

namespace AquaChatAPI.Data.Entities
{
    public class UserEmailEntity
    {
       public string Email { get; set; }
        public string UserID { get; set; }

        public bool Primary { get; set; }
    }
}
