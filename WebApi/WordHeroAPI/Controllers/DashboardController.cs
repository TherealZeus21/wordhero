using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebTool.Service.Interfaces;
using WebToolDataAccess.Interfaces;

namespace WordHeroAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : BaseAPIController
    {
        ITeacherDashboardService _teacherDashboard;

        public DashboardController(ITeacherDashboardService dashboardService)
        {
            _teacherDashboard = dashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _teacherDashboard.GetLessons(LoggedInUserGuid));
        }
    }
}