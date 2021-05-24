using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebToolDataAccess.Interfaces;

namespace WebToolDataAccess.Repositories
{
    public class WordHeroShareRepository : IWordHeroShareRepository
    {

        private readonly DatabaseContext _dbContext;
        public WordHeroShareRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateGroup(WordHeroShareData group)
        {
            await _dbContext.WordHeroShareData.AddAsync(group);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<WordHeroShareData>> GetGroups(int wordheroId)
        {
            return await _dbContext.WordHeroShareData.Where(x => x.WordHeroId == wordheroId).ToListAsync();
        }
    }
}
