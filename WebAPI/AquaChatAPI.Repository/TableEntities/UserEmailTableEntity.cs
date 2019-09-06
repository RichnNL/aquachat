using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
    public class UserEmailTableEntity : TableEntity
    {
        public UserEmailTableEntity()
        {

        }
        public UserEmailTableEntity(string user_id, string email)
        {
            this.PartitionKey = user_id;
            this.RowKey = email;
        }

        public Boolean Primary { get; set; }
    }
}
