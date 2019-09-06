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
   public class ChannelRepository : IGenericRepository<ChannelEntity>
    {
        BaseCloudTable<ChannelTableEntity> cloudTable;

        public ChannelRepository()
        {
            this.cloudTable = new BaseCloudTable<ChannelTableEntity>("Channel");
        }
        private ChannelEntity toEntity(ChannelTableEntity tableEntity)
        {
            ChannelEntity entity = new ChannelEntity();


            entity.WorkspaceID = tableEntity.PartitionKey;
            entity.ChannelId = tableEntity.RowKey;

            if (!string.IsNullOrWhiteSpace(tableEntity.Name))
            {
                entity.Name = tableEntity.Name;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Owner))
            {
                entity.Owner = tableEntity.Owner;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Picture_Location))
            {
                entity.Picture_Location = tableEntity.Picture_Location;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Users))
            {
                entity.Users = tableEntity.Users;
            }

            return entity;
        }
        private ChannelTableEntity toTableEntity(ChannelEntity entity)
        {
            ChannelTableEntity tableEntity = new ChannelTableEntity(entity.WorkspaceID, entity.ChannelId);

            if (!string.IsNullOrWhiteSpace(entity.Name))
            {
                tableEntity.Name = entity.Name;
            }

            if (!string.IsNullOrWhiteSpace(entity.Owner))
            {
                tableEntity.Owner = entity.Owner;
            }

            if (!string.IsNullOrWhiteSpace(entity.Picture_Location))
            {
                tableEntity.Picture_Location = entity.Picture_Location;
            }

            if (!string.IsNullOrWhiteSpace(entity.Users))
            {
                tableEntity.Users = entity.Users;
            }

            return tableEntity;

        }
        private List<ChannelEntity> ToEntityList(ChannelTableEntity[] tableEntities)
        {

            List<ChannelEntity> entities = new List<ChannelEntity>();
            foreach (ChannelTableEntity tableEntity in tableEntities)
            {
                ChannelEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }

        public async Task<bool> Delete(ChannelEntity entity)
        {
            ChannelTableEntity channelTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(channelTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<ChannelEntity> Get(string[] key, string[] value)
        {
            return await Task<ChannelEntity>.Run(() => {
                ChannelTableEntity channelTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(channelTableEntity);
            });
        }

        public async Task<IEnumerable<ChannelEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<ChannelEntity>>.Run(() =>
            {
                ChannelTableEntity[] channelTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<ChannelEntity> entities = this.ToEntityList(channelTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<ChannelEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<ChannelEntity>>.Run(() =>
            {
                ChannelTableEntity[] channelTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<ChannelEntity> entities = this.ToEntityList(channelTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(ChannelEntity entity)
        {
            ChannelTableEntity channelTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(channelTableEntity);
        }

        public async Task<bool> Update(ChannelEntity entity)
        {
            ChannelTableEntity channelTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(channelTableEntity);
        }
    }
}
