
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
   public class WorkspaceMessageTableEntity : TableEntity
    {

        public WorkspaceMessageTableEntity()
        {

        }
        public WorkspaceMessageTableEntity(string Workspace_Id, string Epoch)
        {
            this.PartitionKey = Workspace_Id;
            this.RowKey = Epoch;
        }

        public string Message { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
        public string Sender { get; set; }
    }
}
