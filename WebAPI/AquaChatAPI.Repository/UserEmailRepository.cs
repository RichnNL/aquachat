using System.Collections.Generic;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using System.Linq;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;

namespace AquaChatAPI.Repository
{
    public class UserEmailRepository : IGenericRepository<UserEmailEntity>
    {

        BaseCloudTable<UserEmailTableEntity> cloudTable;

        public UserEmailRepository()
        {
            cloudTable = new BaseCloudTable<UserEmailTableEntity>("UserEmail");
        }
        public async Task<bool> Delete(UserEmailEntity entity)
        { 
                
                UserEmailTableEntity userEmailTableEntity = this.toTableEntity(entity);
                return await this.cloudTable.Delete(userEmailTableEntity);
            
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<UserEmailEntity> Get(string[] key, string[] value)
        {
            return await Task<UserEntity>.Run(() => {
                UserEmailTableEntity userTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(userTableEntity);
            });
        }

        public async Task<IEnumerable<UserEmailEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<UserEntity>>.Run(() =>
            {
                UserEmailTableEntity[] userTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<UserEmailEntity> entities = this.ToEntityList(userTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<UserEmailEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<UserEntity>>.Run(() =>
            {
                UserEmailTableEntity[] userTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<UserEmailEntity> entities = this.ToEntityList(userTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(UserEmailEntity entity)
        {
            UserEmailTableEntity emailTableEntity = toTableEntity(entity);
            return await this.cloudTable.Insert(emailTableEntity);
           
            
        }

        public async Task<bool> Update(UserEmailEntity entity)
        {
            UserEmailTableEntity emailTableEntity = toTableEntity(entity);
            return await this.cloudTable.Update(emailTableEntity);


        }

        public UserEmailEntity toEntity(UserEmailTableEntity tableentity)
        {
            UserEmailEntity entity = new UserEmailEntity();
            entity.UserID = tableentity.PartitionKey;
            entity.Email = tableentity.RowKey;

            return entity;
        }

        public UserEmailTableEntity toTableEntity(UserEmailEntity entity)
        {
            UserEmailTableEntity tableentity = new UserEmailTableEntity(entity.UserID, entity.Email);
            tableentity.Primary = entity.Primary;
            return tableentity;
        }

        private List<UserEmailEntity> ToEntityList(UserEmailTableEntity[] tableEntities)
        {

            List<UserEmailEntity> entities = new List<UserEmailEntity>();
            foreach (UserEmailTableEntity tableEntity in tableEntities)
            {
                UserEmailEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }
    }
}
