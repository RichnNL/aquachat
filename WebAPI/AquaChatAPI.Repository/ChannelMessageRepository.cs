using System.Collections.Generic;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;
using System.Linq;
namespace AquaChatAPI.Repository
{
    public class ChannelMessageRepository : IGenericRepository<ChannelMessageEntity>
    {

        BaseCloudTable<ChannelMessageTableEntity> cloudTable;

        public ChannelMessageRepository()
        {
            this.cloudTable = new BaseCloudTable<ChannelMessageTableEntity>("ChannelMessage");
        }
        public ChannelMessageEntity toEntity(ChannelMessageTableEntity tableEntity)
        {
            ChannelMessageEntity entity = new ChannelMessageEntity();

            string[] channelWorkspaceIds = tableEntity.PartitionKey.Split("_____");
            entity.Epoch = tableEntity.RowKey;

            if (channelWorkspaceIds.Length == 2)
            {
                entity.WorkspaceID = channelWorkspaceIds[0];
                entity.ChannelID = channelWorkspaceIds[1];
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Location))
            {
                entity.Location = tableEntity.Location;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Type))
            {
                entity.Type = tableEntity.Type;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Message))
            {
                entity.Message = tableEntity.Message;
            }

            return entity;
        }
        public ChannelMessageTableEntity toTableEntity(ChannelMessageEntity entity)
        {
            ChannelMessageTableEntity tableEntity = new ChannelMessageTableEntity(entity.WorkspaceID, entity.ChannelID, entity.Epoch);

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

            if (!string.IsNullOrWhiteSpace(entity.UserId))
            {
                tableEntity.Sender = entity.UserId;
            }

            return tableEntity;

        }
        public async Task<bool> Delete(ChannelMessageEntity entity)
        {
            ChannelMessageTableEntity tableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(tableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<ChannelMessageEntity> Get(string[] key, string[] value)
        {
            return await Task<ChannelMessageEntity>.Run(() => {
                ChannelMessageTableEntity channelMessageTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(channelMessageTableEntity);
            });
        }

        public async Task<IEnumerable<ChannelMessageEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<ChannelMessageEntity>>.Run(() =>
            {
                ChannelMessageTableEntity[] channelMessageTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<ChannelMessageEntity> entities = this.ToEntityList(channelMessageTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<ChannelMessageEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<ChannelMessageEntity>>.Run(() =>
            {
                ChannelMessageTableEntity[] channelMessageTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<ChannelMessageEntity> entities = this.ToEntityList(channelMessageTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(ChannelMessageEntity entity)
        {
            ChannelMessageTableEntity channelMessageTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(channelMessageTableEntity);
        }

        public async Task<bool> Update(ChannelMessageEntity entity)
        {
            ChannelMessageTableEntity channelMessageTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(channelMessageTableEntity);
        }

        private List<ChannelMessageEntity> ToEntityList(ChannelMessageTableEntity[] tableEntities)
        {

            List<ChannelMessageEntity> entities = new List<ChannelMessageEntity>();
            foreach (ChannelMessageTableEntity tableEntity in tableEntities)
            {
                ChannelMessageEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }
    }
}
