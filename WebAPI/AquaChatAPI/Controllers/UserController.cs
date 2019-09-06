using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AquaChatAPI.Domain.Models;
using AquaChatAPI.Business.Interfaces;
namespace AquaChatAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IUserBusiness _userBusiness;
        public UserController(IUserBusiness userBusiness)
        {
            this._userBusiness = userBusiness;
        }

        [HttpGet]
        public async Task<UserDetailsModel> GetUserDetails([FromQuery] string userid)
        {
            return await this._userBusiness.GetUserDetails(userid);
        }

        [Route("test")]
        [HttpGet]
        public ResponseModel Test()
        {
            ResponseModel test = new ResponseModel();
            test.Message = "OKE";
            return test;
        }



        [HttpPost]
        public async Task<ResponseModel> RegisterUser([FromBody] UserModel user)
        {
            return await this._userBusiness.RegisterUser(user);
        }

       
    }
}
