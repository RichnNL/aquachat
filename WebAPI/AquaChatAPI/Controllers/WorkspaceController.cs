using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Business.Interfaces;
namespace AquaChatAPI.Controllers
{
    [Route("api/workspace")]
    [ApiController]
    public class WorkspaceController : ControllerBase
    {


        private IWorkspaceBusiness _workBusiness;
        public WorkspaceController(IWorkspaceBusiness workspaceBusiness)
        {
            this._workBusiness = workspaceBusiness;
        }

        [HttpPost]
        public async Task<ResponseModel> RegisterWorkspace([FromBody] WorkspaceModel workspace )
        {
            return await this._workBusiness.RegisterWorkspace(workspace);
        }

        [Route("user")]
        [HttpPost]
        public async Task<ResponseModel> AddToWorkspace([FromBody] string[] users, [FromQuery] string userid, [FromQuery] string workspaceid )
        {
            return await this._workBusiness.AddUserToWorkspace(userid, workspaceid, users);
        }

        [Route("removeuser")]
        [HttpDelete]
        public async Task<ResponseModel> RemoveFromWorkspace([FromQuery] string[] users, [FromQuery] string userid, [FromQuery] string workspaceid)
        {
            return await this._workBusiness.RemoveUserFromWorkspace(userid, workspaceid, users);
        }

        [HttpGet]
        public async Task<WorkspaceModel[]> GetWorkspaces( [FromQuery] string userid, string search)
        {
            return await this._workBusiness.GetWorkspacesByName(userid, search);
        }
        
        [Route("taken")]
        [HttpGet]
        public async Task<bool> NameTaken([FromQuery] string name)
        {
            return await this._workBusiness.WorkspaceNameTaken(name);
        }

    }
}