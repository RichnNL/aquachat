using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureADB2C.UI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using AquaChatAPI.Business.Interfaces;
using AquaChatAPI.Repository.Base;
using AquaChatAPI.Repository.Interface;
using AquaChatAPI.Repository;
using AquaChatAPI.Data.Entities;
using AquaChatAPI.Business;
using AquaChatAPI.Business.Base;
using Microsoft.WindowsAzure.Storage.Table;
using AquaChatAPI.Controllers;
using AquaChatAPI.Repository.TableEntities;
using AquaChatAPI.Business.Services;

namespace AquaChatAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(AzureADB2CDefaults.BearerAuthenticationScheme)
                .AddAzureADB2CBearer(options => Configuration.Bind("AzureAdB2C", options));

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:44332", "https://aquadischatapp.nl")
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddScoped<IChannelBusiness, ChannelStorageBusiness>();
            services.AddScoped<IWorkspaceBusiness, WorkspaceStorageBusiness>();
            services.AddScoped<IUserBusiness, UserStorageBusiness>();
            services.AddScoped<IGenericRepository<UserEntity>, UserRepository >();
            services.AddScoped<IGenericRepository<UserEmailEntity>, UserEmailRepository>();
            services.AddScoped<IGenericRepository<WorkspaceEntity>, WorkspaceRepository>();
            services.AddScoped<IGenericRepository<ChannelEntity>, ChannelRepository>();
            services.AddScoped<IGenericRepository<UserChannelEntity>, UserChannelRepository>();
            services.AddScoped<IMessageBusiness, MessageStorageBusiness>();
            services.AddScoped<IGenericRepository<ChatGroupEntity>, ChatGroupRepository>();
            services.AddScoped<IGenericRepository<DirectMessageEntity>, DirectMessageRepository>();
            services.AddScoped<IGenericRepository<WorkspaceMessageEntity>, WorkspaceMessageRepository>();
            services.AddScoped<IGenericRepository<ChannelMessageEntity>, ChannelMessageRepository>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddSignalR();        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            
            app.UseCors("CorsPolicy");

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();

            app.UseSignalR(routes =>
            {
                routes.MapHub<Chat>("/chat");
            }
                );
          
        }
    }
}
