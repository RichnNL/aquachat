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
    public class DirectMessageRepository : IGenericRepository<DirectMessageEntity>
    {
        BaseCloudTable<DirectMessageTableEntity> cloudTable;

        public DirectMessageRepository()
        {
            this.cloudTable = new BaseCloudTable<DirectMessageTableEntity>("DirectMessage");
        }
        private DirectMessageEntity toEntity(DirectMessageTableEntity tableEntity)
        {
            DirectMessageEntity entity = new DirectMessageEntity();

            entity.ChatId = tableEntity.PartitionKey;
            entity.Epoch = tableEntity.RowKey;

            if (!string.IsNullOrWhiteSpace(tableEntity.Location))
            {
                entity.Location = tableEntity.Location;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Message))
            {
                entity.Message = tableEntity.Message;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Type))
            {
                entity.Type = tableEntity.Type;
            }
            if (!string.IsNullOrWhiteSpace(tableEntity.SenderEmail))
            {
                entity.SenderEmail = tableEntity.SenderEmail;
            }

            return entity;
        }

        private DirectMessageTableEntity toTableEntity(DirectMessageEntity entity)
        {
            DirectMessageTableEntity tableEntity = new DirectMessageTableEntity(entity.ChatId, entity.Epoch);

            if (!string.IsNullOrWhiteSpace(entity.Location))
            {
                tableEntity.Location = entity.Location;
            }

            if (!string.IsNullOrWhiteSpace(entity.Message))
            {
                tableEntity.Message = entity.Message;
            }

            if (!string.IsNullOrWhiteSpace(entity.Type))
            {
                tableEntity.Type = entity.Type;
            }

            if (!string.IsNullOrWhiteSpace(entity.SenderEmail))
            {
                tableEntity.SenderEmail = entity.SenderEmail;
            }

            return tableEntity;

        }
        private List<DirectMessageEntity> ToEntityList(DirectMessageTableEntity[] tableEntities)
        {

            List<DirectMessageEntity> entities = new List<DirectMessageEntity>();
            foreach (DirectMessageTableEntity tableEntity in tableEntities)
            {
                DirectMessageEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }
        public async Task<bool> Delete(DirectMessageEntity entity)
        {
            DirectMessageTableEntity directTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(directTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<DirectMessageEntity> Get(string[] key, string[] value)
        {
            return await Task<DirectMessageEntity>.Run(() => {
                DirectMessageTableEntity directTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(directTableEntity);
            });
        }

        public async Task<IEnumerable<DirectMessageEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<DirectMessageEntity>>.Run(() =>
            {
                DirectMessageTableEntity[] directTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<DirectMessageEntity> entities = this.ToEntityList(directTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<DirectMessageEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<DirectMessageEntity>>.Run(() =>
            {
                DirectMessageTableEntity[] directTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<DirectMessageEntity> entities = this.ToEntityList(directTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(DirectMessageEntity entity)
        {
            DirectMessageTableEntity directTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(directTableEntity);
        }

        public async Task<bool> Update(DirectMessageEntity entity)
        {
            DirectMessageTableEntity directTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(directTableEntity);
        }
    }
}
