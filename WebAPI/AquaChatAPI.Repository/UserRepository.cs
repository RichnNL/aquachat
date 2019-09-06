using System.Collections.Generic;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;
using System.Linq;

namespace AquaChatAPI.Repository
{
    public class UserRepository : IGenericRepository<UserEntity>
    {

        BaseCloudTable<UserTableEntity> cloudTable;

        public UserRepository()
        {
            cloudTable = new BaseCloudTable<UserTableEntity>("Users");
        }
        public async Task<bool> Delete(UserEntity entity)
        {
            UserTableEntity userTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(userTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<UserEntity> Get(string[] key, string[] value)
        {
            return await Task<UserEntity>.Run(() => {
                UserTableEntity userTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(userTableEntity);
            });
        }

        public async Task<IEnumerable<UserEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<UserEntity>>.Run(() =>
            {
                UserTableEntity[] userTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<UserEntity> entities = this.ToEntityList(userTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<UserEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<UserEntity>>.Run(() =>
            {
                UserTableEntity[] userTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<UserEntity> entities = this.ToEntityList(userTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(UserEntity entity)
        {
            UserTableEntity userTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(userTableEntity);
        }

        public async Task<bool> Update(UserEntity entity)
        {
            UserTableEntity userTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(userTableEntity);
        }

        public UserEntity toEntity(UserTableEntity tableentity)
        {
            UserEntity entity = new UserEntity();
           
            entity.WorkSpaceID = tableentity.RowKey;
            entity.UserID = tableentity.PartitionKey;

            if (!string.IsNullOrWhiteSpace(tableentity.Language))
            {
                entity.Language = tableentity.Language;
            }

            if (!string.IsNullOrWhiteSpace(tableentity.LastName))
            {
                entity.LastName = tableentity.LastName;
            }

            if (!string.IsNullOrWhiteSpace(tableentity.JobTitle))
            {
                entity.JobTitle = tableentity.JobTitle;
            }

            if (!string.IsNullOrWhiteSpace(tableentity.Role))
            {
                entity.Role = tableentity.Role;
            }

            if (!string.IsNullOrWhiteSpace(tableentity.Email))
            {
                entity.Email = tableentity.Email;
            }

            if (!string.IsNullOrWhiteSpace(tableentity.DisplayName))
            {
                entity.DisplayName = tableentity.DisplayName;
            }

            return entity;
        }

        public UserTableEntity toTableEntity(UserEntity entity)
        {
            if (string.IsNullOrWhiteSpace(entity.WorkSpaceID))
            {
                entity.WorkSpaceID = "default";
            }
            UserTableEntity tableentity = new UserTableEntity(entity.WorkSpaceID, entity.UserID);

            if (!string.IsNullOrWhiteSpace(entity.JobTitle))
            {
                tableentity.JobTitle = entity.JobTitle;
            }

            if (!string.IsNullOrWhiteSpace(entity.Language))
            {
                tableentity.Language = entity.Language;
            }

            if (!string.IsNullOrWhiteSpace(entity.LastName))
            {
                tableentity.LastName = entity.LastName;
            }

            if (!string.IsNullOrWhiteSpace(entity.Role))
            {
                tableentity.Role = entity.Role;
            }

            if (!string.IsNullOrWhiteSpace(entity.DisplayName))
            {
                tableentity.DisplayName = entity.DisplayName;
            }

            if (!string.IsNullOrWhiteSpace(entity.Email))
            {
                tableentity.Email = entity.Email;
            }



            return tableentity;

        }

        private List<UserEntity> ToEntityList(UserTableEntity[] tableEntities)
        {

            List<UserEntity> entities = new List<UserEntity>();
            foreach (UserTableEntity tableEntity in tableEntities)
            {
                UserEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }
    }
}
