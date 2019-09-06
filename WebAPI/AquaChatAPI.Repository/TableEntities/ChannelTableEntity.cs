using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
   public class ChannelTableEntity : TableEntity
    {
        public ChannelTableEntity()
        {

        }
        public ChannelTableEntity(string Workspace_ID, string Channel_Id)
        {
            this.PartitionKey = Workspace_ID;
            this.RowKey = Channel_Id;
        }

        public string Name { get; set; }
        public string Picture_Location { get; set; }
        public string Users { get; set; }
        public string Owner { get; set; }
    }
}
