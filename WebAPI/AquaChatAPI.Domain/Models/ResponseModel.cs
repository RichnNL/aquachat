using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AquaChatAPI.Domain.Models
{
    public class ResponseModel
    {
        public ResponseModel()
        {
            this.ErrorMessage = new List<string>();
        }
        public List<string> ErrorMessage { get; set; }
        public string Message { get; set; }
      
    }
}
