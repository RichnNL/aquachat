using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
    class ChatGroupTableEntity : TableEntity
    {
        public ChatGroupTableEntity()
        {

        }
        public ChatGroupTableEntity(string user_Id , string chat_Id )
        {
            this.PartitionKey = user_Id;
            this.RowKey = chat_Id;
        }

        public bool IsOwner { get; set; }
        public string PictureLocation { get; set; }

        public string Name { get; set; }

    }
}
