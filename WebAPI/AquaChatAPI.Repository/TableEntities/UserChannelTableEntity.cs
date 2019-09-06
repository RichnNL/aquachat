using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
  public class UserChannelTableEntity : TableEntity
    {
        public UserChannelTableEntity()
        {

        }
        public UserChannelTableEntity(string user_id, string WorkspaceID, string ChannelID)
        {
            this.PartitionKey = user_id;
            this.RowKey = WorkspaceID + "____" + ChannelID;
        }
        public string JoinDate { get; set; }
        public Boolean Owner { get; set; }
    }
}
