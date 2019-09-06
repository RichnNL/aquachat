using System.Collections.Generic;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Repository.Interface;
using System.Linq;
using System.Threading.Tasks;

namespace AquaChatAPI.Repository
{
    public class WorkspaceRepository : IGenericRepository<WorkspaceEntity>
    {

        BaseCloudTable<WorkspaceTableEntity> cloudTable;

        public WorkspaceRepository()
        {
            this.cloudTable = new BaseCloudTable<WorkspaceTableEntity>("Workspace");
        }
        private WorkspaceEntity toEntity(WorkspaceTableEntity tableEntity)
        {
            WorkspaceEntity entity = new WorkspaceEntity();

            entity.Workspace_ID = tableEntity.PartitionKey;
            entity.Epoch = tableEntity.RowKey;

            if (!string.IsNullOrWhiteSpace(tableEntity.Name))
            {
                entity.Name = tableEntity.Name;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Owner))
            {
                entity.Owner = tableEntity.Owner;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Users))
            {
                entity.Users = tableEntity.Users;
            }
            if (!string.IsNullOrWhiteSpace(tableEntity.PictureLocation))
            {
                entity.PictureLocation = tableEntity.PictureLocation;
            }

            return entity;
        }

        private WorkspaceTableEntity toTableEntity(WorkspaceEntity entity)
        {
            WorkspaceTableEntity tableEntity = new WorkspaceTableEntity(entity.Workspace_ID, entity.Epoch);

            if (!string.IsNullOrWhiteSpace(entity.Name))
            {
                tableEntity.Name = entity.Name;
            }

            if (!string.IsNullOrWhiteSpace(entity.Owner))
            {
                tableEntity.Owner = entity.Owner;
            }

            if (!string.IsNullOrWhiteSpace(entity.Users))
            {
                tableEntity.Users = entity.Users;
            }

            if (!string.IsNullOrWhiteSpace(entity.PictureLocation))
            {
                tableEntity.PictureLocation = entity.PictureLocation;
            }





            return tableEntity;

        }

        private List<WorkspaceEntity> ToEntityList(WorkspaceTableEntity[] tableEntities)
        {

            List<WorkspaceEntity> entities = new List<WorkspaceEntity>();
            foreach (WorkspaceTableEntity tableEntity in tableEntities)
            {
                WorkspaceEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }
        public async Task<bool> Delete(WorkspaceEntity entity)
        {
            WorkspaceTableEntity workspaceTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(workspaceTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<WorkspaceEntity> Get(string[] key, string[] value)
        {
            return await Task<WorkspaceEntity>.Run(() => {
                WorkspaceTableEntity workspaceTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(workspaceTableEntity);
            });
        }

        public async Task<IEnumerable<WorkspaceEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<WorkspaceEntity>>.Run(() =>
            {
                WorkspaceTableEntity[] workspaceTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<WorkspaceEntity> entities = this.ToEntityList(workspaceTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<WorkspaceEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<WorkspaceEntity>>.Run(() =>
            {
                WorkspaceTableEntity[] workspaceTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<WorkspaceEntity> entities = this.ToEntityList(workspaceTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(WorkspaceEntity entity)
        {
            WorkspaceTableEntity workspaceTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(workspaceTableEntity);
        }

        public async Task<bool> Update(WorkspaceEntity entity)
        {
            WorkspaceTableEntity workspaceTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(workspaceTableEntity);
        }
    }
}
