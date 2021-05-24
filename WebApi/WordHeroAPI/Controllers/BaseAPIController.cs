using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WordHeroAPI.Controllers
{
    [ApiController]
    [Authorize]
    public class BaseAPIController : ControllerBase
    {
        protected string LoggedInUserGuid
        {
            get
            {
                var claims = User as ClaimsPrincipal;
                return claims.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;
                //return "f73510a9-357d-4dbd-9afb-1be1e9ea59e2";
            }
        }
    }
}