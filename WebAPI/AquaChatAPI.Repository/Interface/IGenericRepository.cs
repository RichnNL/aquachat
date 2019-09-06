using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AquaChatAPI.Data.Entities;
namespace AquaChatAPI.Repository.Interface
{
    public interface IGenericRepository<E> where E : class
    {
        Task<Boolean> Exists(string[] key, string[] value);
        Task<E> Get(string[] key, string[] value);
        Task<IEnumerable<E>> GetAllAsync();

        Task<IEnumerable<E>> GetAll(string[] key, string[] value);

        Task<Boolean> Insert(E entity);

        Task<Boolean> Update(E entity);

        Task<Boolean> Delete(E entity);

    }
}
