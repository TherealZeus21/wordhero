using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DTO;
using WebToolDataAccess.Models;

namespace WebTool.Service.Interfaces
{
    public interface ITeacherDashboardService
    {
        Task<IList<WordHeroListDto>> GetLessons(string teacherId);
    }
}
