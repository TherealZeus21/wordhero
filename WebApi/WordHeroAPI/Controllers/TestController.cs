using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WordHeroAPI.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("ping")]
        public async Task<IActionResult> Ping()
        {
            return Ok("pong1");
        }
    }
}