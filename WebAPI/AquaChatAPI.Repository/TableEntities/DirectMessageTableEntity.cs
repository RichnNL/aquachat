using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
   public class DirectMessageTableEntity : TableEntity
    {
        public DirectMessageTableEntity()
        {

        }
        public DirectMessageTableEntity(string Chat_Id, string Epoch)
        {
            this.PartitionKey = Chat_Id;
            this.RowKey = Epoch;
        }

        public string Type { get; set; }
        public string Message { get; set; }
        public string Location { get; set; }
        public string SenderEmail { get; set; }
    }
}
