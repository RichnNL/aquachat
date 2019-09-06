using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
namespace AquaChatAPI.Repository.Interface
{
    public interface ICloudTable<E>
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
