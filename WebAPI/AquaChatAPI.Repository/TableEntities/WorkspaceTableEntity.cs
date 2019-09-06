
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
    public class WorkspaceTableEntity : TableEntity
    {
        public WorkspaceTableEntity()
        {

        }
        public WorkspaceTableEntity(string Workspace_Id, string Epoch)
        {
            this.PartitionKey = Workspace_Id;
            this.RowKey = Epoch;
        }
        public string Name { get; set; }
        public string Users { get; set; }
        public string Owner { get; set; }

        public string PictureLocation { get; set; }

       
    }
}
