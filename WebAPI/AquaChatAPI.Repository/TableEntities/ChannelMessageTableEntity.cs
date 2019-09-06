using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;

namespace AquaChatAPI.Repository.TableEntities
{
    public class ChannelMessageTableEntity : TableEntity
    {
        public ChannelMessageTableEntity()
        {

        }

        public ChannelMessageTableEntity(string WorkspaceID, string ChannelID, string Epoch)
        {
            this.PartitionKey = WorkspaceID + "____" + ChannelID;
            this.RowKey = Epoch;
        }

        public string Message { get; set; }

        public string Type { get; set; }
        public string Sender { get; set; }
        public string Location { get; set; }
    }
}
