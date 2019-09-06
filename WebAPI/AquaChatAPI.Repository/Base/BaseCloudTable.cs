using System;
using System.Collections.Generic;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using AquaChatAPI.Repository.Interface;
using System.IO;

namespace AquaChatAPI.Repository.Base
{
    class BaseCloudTable<T> where T : ITableEntity, new()
    {
        private CloudTable cloudTable;

        public BaseCloudTable(string tableName)
        {
            this.initTable(tableName);
        }

        public async Task<bool> Update(T tableEntity) 
        {
            return await Task<Boolean>.Run(() =>
            {
                try
                {
                    TableOperation tableOperation = TableOperation.InsertOrMerge(tableEntity);
                    TableResult result = this.cloudTable.ExecuteAsync(tableOperation).Result;
                    return this.HttpStatusOk(result.HttpStatusCode.ToString());

                }
                catch
                {
                    return false;
                }
            });
        }

        public async Task<Boolean> Insert(T tableEntity) 
        {
            return await Task<Boolean>.Run(() =>
            {
                try
                {
                    TableOperation insertOperation = TableOperation.Insert(tableEntity);
                    TableResult result = this.cloudTable.ExecuteAsync(insertOperation).Result;
                    return this.HttpStatusOk(result.HttpStatusCode.ToString());
                }
                catch
                {
                    return false;
                }
            });
        }

        public async Task<Boolean> Exists(string[] key, string[] value)
        {
            return await Task<bool>.Run(() => {
                try
                {
                    TableQuery<T> query = this.GetQuery(key, value);

                    TableContinuationToken token = null;
                    List<T> list = new List<T>();

                    do
                    {
                        TableQuerySegment<T> resultSegment = this.cloudTable.ExecuteQuerySegmentedAsync(query, token).Result;
                        token = resultSegment.ContinuationToken;

                        foreach (T model in resultSegment.Results)
                        {

                            return true;
                        }

                    } while (token != null);

                    return false;
                }
                catch
                {
                    return false;
                }
            });

        }

        public async Task<T> Get(string[] key, string[] value)
        {
            return await Task<T>.Run(() =>
            {
                TableQuery<T> query = this.GetQuery(key, value);

                TableContinuationToken token = null;

                TableQuerySegment<T> resultSegment = this.cloudTable.ExecuteQuerySegmentedAsync(query, token).Result;
                token = resultSegment.ContinuationToken;
                T table = new T();
                if (resultSegment.Results.Count > 0)
                {
                    table = resultSegment.Results[0];
                }
                

                return table;   
            });
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {

            TableContinuationToken token = null;
            List<T> list = new List<T>();
            return await Task<IEnumerable<T>>.Run(() =>
            {
                do
                {
                    TableQuery<T> query = new TableQuery<T>();

                    TableQuerySegment<T> resultSegment = this.cloudTable.ExecuteQuerySegmentedAsync(query, token).Result;
                    token = resultSegment.ContinuationToken;

                    foreach (T model in resultSegment.Results)
                    {
                        list.Add(model);
                    }

                } while (token != null);
            

                return list;
            });
        }

        public async Task<IEnumerable<T>> GetAll(string[] key, string[] value)
        {
            TableQuery<T> query = this.GetQuery(key, value);
            TableContinuationToken token = null;
            return await Task<IEnumerable<T>>.Run(() =>
            {
                List<T> list = new List<T>();
                do
                {
                    TableQuerySegment<T> resultSegment = this.cloudTable.ExecuteQuerySegmentedAsync(query, token).Result;
                    token = resultSegment.ContinuationToken;

                    foreach (T model in resultSegment.Results)
                    {
                        list.Add(model);
                    }

                } while (token != null);

                return list;
            });
        }

        public async Task<bool> Delete(T tableEntity)
        {
            tableEntity.ETag = "*";
            TableOperation deleteOperation = TableOperation.Delete(tableEntity);
            TableResult result = await this.cloudTable.ExecuteAsync(deleteOperation);
            return this.HttpStatusOk(result.HttpStatusCode.ToString());
        }

        private void initTable(string tableName)
        {
            var builder = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json");
            IConfigurationRoot Configuration = builder.Build();
            CloudStorageAccount storageAccount =
                CloudStorageAccount.Parse(Configuration["ConnectionStrings:AzureStorageConnectionString-1"]);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            this.cloudTable = tableClient.GetTableReference(tableName);
            this.cloudTable.CreateIfNotExistsAsync();
        }

        private Boolean HttpStatusOk(string message)
        {
            message = message.Substring(0, 1);
            if (message == "2")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private TableQuery<T> GetQuery(string[] key, string[] value)
        {
            TableQuery<T> query = new TableQuery<T>();
            switch (key.Length)
            {
                case 1: {
                        query.Where(TableQuery.GenerateFilterCondition(key[0], QueryComparisons.Equal, value[0]));
                        break;
                    }
                case 2:
                    {
                        query.Where(
                        TableQuery.CombineFilters(
                        TableQuery.GenerateFilterCondition(key[0], QueryComparisons.Equal, value[0]),
                        TableOperators.And,
                        TableQuery.GenerateFilterCondition(key[1], QueryComparisons.Equal, value[1])));
                        break;
                    }
            }
            
            
            
            
            for (int i = 0; i < key.Length; i++)
            {
                
            };
            return query;
        }
    }
}
