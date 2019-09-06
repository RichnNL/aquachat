using System;
using System.Collections.Generic;
using System.Text;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Repository.Interface;
using System.Threading.Tasks;
using System.Linq;

namespace AquaChatAPI.Repository
{
   public class ChatGroupRepository : IGenericRepository<ChatGroupEntity>
    {
        BaseCloudTable<ChatGroupTableEntity> cloudTable;

        public ChatGroupRepository()
        {
            this.cloudTable = new BaseCloudTable<ChatGroupTableEntity>("ChatGroup");
        }
        private ChatGroupEntity toEntity(ChatGroupTableEntity tableEntity)
        {
            ChatGroupEntity entity = new ChatGroupEntity();

            entity.ChatId = tableEntity.RowKey;
            entity.SenderId = tableEntity.PartitionKey;

            if (!string.IsNullOrWhiteSpace(tableEntity.PictureLocation))
            {
                entity.PictureLocation = tableEntity.PictureLocation;
            }

            if (!string.IsNullOrWhiteSpace(tableEntity.Name))
            {
                entity.Name = tableEntity.Name;
            }

            if (tableEntity.IsOwner)
            {
                entity.IsOwner = true;
            }
            else
            {
                entity.IsOwner = false;
            }




            return entity;
        }

        private ChatGroupTableEntity toTableEntity(ChatGroupEntity entity)
        {
            ChatGroupTableEntity tableEntity = new ChatGroupTableEntity(entity.SenderId, entity.ChatId);

            if (!string.IsNullOrWhiteSpace(entity.PictureLocation))
            {
                tableEntity.PictureLocation = entity.PictureLocation;
            }

            if (!string.IsNullOrWhiteSpace(entity.Name))
            {
                tableEntity.Name = entity.Name;
            }
          

            if (entity.IsOwner)
            {
                tableEntity.IsOwner = true;
            } else
            {
                tableEntity.IsOwner = false;
            }


            return tableEntity;

        }
        private List<ChatGroupEntity> ToEntityList(ChatGroupTableEntity[] tableEntities)
        {

            List<ChatGroupEntity> entities = new List<ChatGroupEntity>();
            foreach (ChatGroupTableEntity tableEntity in tableEntities)
            {
                ChatGroupEntity entity = this.toEntity(tableEntity);
                entities.Add(entity);
            }
            return entities;
        }
        public async Task<bool> Delete(ChatGroupEntity entity)
        {
            ChatGroupTableEntity directTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Delete(directTableEntity);
        }

        public async Task<bool> Exists(string[] key, string[] value)
        {
            return await this.cloudTable.Exists(key, value);
        }

        public async Task<ChatGroupEntity> Get(string[] key, string[] value)
        {
            return await Task<ChatGroupEntity>.Run(() => {
                ChatGroupTableEntity directTableEntity = this.cloudTable.Get(key, value).Result;
                return this.toEntity(directTableEntity);
            });
        }

        public async Task<IEnumerable<ChatGroupEntity>> GetAll(string[] key, string[] value)
        {
            return await Task<IEnumerable<ChatGroupEntity>>.Run(() =>
            {
                ChatGroupTableEntity[] directTableEntities = this.cloudTable.GetAll(key, value).Result.ToArray();
                List<ChatGroupEntity> entities = this.ToEntityList(directTableEntities);
                return entities;
            });
        }

        public async Task<IEnumerable<ChatGroupEntity>> GetAllAsync()
        {
            return await Task<IEnumerable<ChatGroupEntity>>.Run(() =>
            {
                ChatGroupTableEntity[] directTableEntities = this.cloudTable.GetAllAsync().Result.ToArray();
                List<ChatGroupEntity> entities = this.ToEntityList(directTableEntities);
                return entities;
            });
        }

        public async Task<bool> Insert(ChatGroupEntity entity)
        {
            ChatGroupTableEntity directTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Insert(directTableEntity);
        }

        public async Task<bool> Update(ChatGroupEntity entity)
        {
            ChatGroupTableEntity directTableEntity = this.toTableEntity(entity);
            return await this.cloudTable.Update(directTableEntity);
        }
    }
}
