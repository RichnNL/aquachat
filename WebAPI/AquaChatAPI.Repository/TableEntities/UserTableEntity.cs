using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.TableEntities
{
    public class UserTableEntity : TableEntity
    {
        public UserTableEntity()
        {

        }
        public UserTableEntity(string Workspace_ID, string user_Id)
        {
            this.PartitionKey = user_Id;
            this.RowKey = Workspace_ID;
        }
        public string DisplayName { get; set; }
        public string Language { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
    }
}
