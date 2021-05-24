using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DTO;
using WebToolDataAccess.Interfaces;
using WebToolDataAccess.Models;

namespace WebToolDataAccess.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly DatabaseContext _dbContext;
        public DashboardRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
