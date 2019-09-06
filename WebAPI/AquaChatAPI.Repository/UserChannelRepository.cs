using System.Collections.Generic;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using System.Linq;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;

namespace AquaChatAPI.Repository
{
   public class UserChannelRepository : IGenericRepository<UserChannelEntity>
    {
        BaseCloudTable<UserChannelTableEntity> cloudTable;

        public UserChannelRepository()
        {
            this.cloudTable = new BaseCloudTable<UserChannelTableEntity>("UserChannel");
        }
        private  UserChannelEntity toEntity(UserChannelTableEntity tableEntity)
        {
            UserChannelEntity entity = new UserChannelEntity();
            entity.UserID = tableEntity.PartitionKey;
            string[] ids = tableEntity.RowKey.Split("____");
            entity.WorkspaceID = ids[0];
            entity.ChannelID = ids[1];

            if (!string.IsNullOrWhiteSpace(tableEntity.JoinDate))
            {
                entity.JoinDate = tableEntity.JoinDate;
            }

            entity.Owner = tableEntity.Owner;
            return entity;
        }
        private UserChannelTableEntity toTableEntity(UserChannelEntity entity)
        {
            UserChannelTableEntity tableEntity = new UserChannelTableEntity(entity.UserID, entity.WorkspaceID, entity.ChannelID);

            if (!string.IsNullOrWhiteSpace(entity.JoinDate))
            {
                tableEntity.JoinDate = entity.JoinDate;
            }

                tableEntity.Owner = entity.Owner;
            
            return tableEntity;

        }
        private List<UserChannelEntity> ToEntityList(UserChannelTableEntity[] tableEntities)
        {

            List<UserChannelEntity> entities = new List<UserChannelEntity>();
            foreach (UserChannelTableEntity tableEntity in tableEntities)
            {
                UserChannelEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }

        public async Task<bool> Delete(UserChannelEntity entity)
        {
            UserChannelTableEntity userChannelTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(userChannelTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<UserChannelEntity> Get(string[] key, string[] value)
        {
            return await Task<UserEntity>.Run(() => {
                UserChannelTableEntity userChannelTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(userChannelTableEntity);
            });
        }

        public async Task<IEnumerable<UserChannelEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<UserChannelEntity>>.Run(() =>
            {
                UserChannelTableEntity[] userTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<UserChannelEntity> entities = this.ToEntityList(userTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<UserChannelEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<UserChannelEntity>>.Run(() =>
            {
                UserChannelTableEntity[] userChannelTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<UserChannelEntity> entities = this.ToEntityList(userChannelTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(UserChannelEntity entity)
        {
            UserChannelTableEntity userChannelTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(userChannelTableEntity);
        }

        public async Task<bool> Update(UserChannelEntity entity)
        {
            UserChannelTableEntity userChannelTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(userChannelTableEntity);
        }
    }
}
