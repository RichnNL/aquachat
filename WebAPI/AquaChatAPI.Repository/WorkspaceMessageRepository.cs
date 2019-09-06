using System;
using System.Collections.Generic;
using System.Text;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using Microsoft.WindowsAzure.Storage.Table;
using System.Linq;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;

namespace AquaChatAPI.Repository
{
   public class WorkspaceMessageRepository : IGenericRepository<WorkspaceMessageEntity>
    {


        BaseCloudTable<WorkspaceMessageTableEntity> cloudTable;

        public WorkspaceMessageRepository()
        {
            this.cloudTable = new BaseCloudTable<WorkspaceMessageTableEntity>("WorkspaceMessage");
        }



        private WorkspaceMessageEntity toEntity(WorkspaceMessageTableEntity tableEntity)
        {
            WorkspaceMessageEntity entity = new WorkspaceMessageEntity();

            entity.WorkspaceID = tableEntity.PartitionKey;
            entity.Epoch = tableEntity.RowKey;

            if (!string.IsNullOrWhiteSpace(tableEntity.Location))
            {
                entity.Location = tableEntity.Location;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Message))
            {
                entity.Message = tableEntity.Message;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Sender))
            {
                entity.UserID = tableEntity.Sender;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Type))
            {
                entity.Type = tableEntity.Type;
            }

            return entity;
        }
        private WorkspaceMessageTableEntity toTableEntity(WorkspaceMessageEntity entity)
        {
            WorkspaceMessageTableEntity tableEntity = new WorkspaceMessageTableEntity(entity.WorkspaceID, entity.Epoch);

            if (!string.IsNullOrWhiteSpace(entity.Location))
            {
                tableEntity.Location = entity.Location;
            }

            if (!string.IsNullOrWhiteSpace(entity.Message))
            {
                tableEntity.Message = entity.Message;
            }

            if (!string.IsNullOrWhiteSpace(entity.UserID))
            {
                tableEntity.Sender = entity.UserID;
            }

            if (!string.IsNullOrWhiteSpace(entity.Type))
            {
                tableEntity.Type = entity.Type;
            }

            return tableEntity;

        }
        private List<WorkspaceMessageEntity> ToEntityList(WorkspaceMessageTableEntity[] tableEntities)
        {

            List<WorkspaceMessageEntity> entities = new List<WorkspaceMessageEntity>();
            foreach (WorkspaceMessageTableEntity tableEntity in tableEntities)
            {
                WorkspaceMessageEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }

        public async Task<bool> Delete(WorkspaceMessageEntity entity)
        {
            WorkspaceMessageTableEntity workspaceMessageTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(workspaceMessageTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<WorkspaceMessageEntity> Get(string[] key, string[] value)
        {
            return await Task<WorkspaceMessageEntity>.Run(() => {
                WorkspaceMessageTableEntity workspaceMessageTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(workspaceMessageTableEntity);
            });
        }

        public async Task<IEnumerable<WorkspaceMessageEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<WorkspaceMessageEntity>>.Run(() =>
            {
                WorkspaceMessageTableEntity[] workspaceMessageTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<WorkspaceMessageEntity> entities = this.ToEntityList(workspaceMessageTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<WorkspaceMessageEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<WorkspaceMessageEntity>>.Run(() =>
            {
                WorkspaceMessageTableEntity[] workspaceMessageTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<WorkspaceMessageEntity> entities = this.ToEntityList(workspaceMessageTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(WorkspaceMessageEntity entity)
        {
            WorkspaceMessageTableEntity workspaceMessageTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(workspaceMessageTableEntity);
        }

        public async Task<bool> Update(WorkspaceMessageEntity entity)
        {
            WorkspaceMessageTableEntity workspaceMessageTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(workspaceMessageTableEntity);
        }
    }
}
