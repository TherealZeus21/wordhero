using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;

namespace WebToolDataAccess.Interfaces
{
    public interface IWordHeroShareRepository
    {
        public Task<List<WordHeroShareData>> GetGroups(int wordheroId);
        Task CreateGroup(WordHeroShareData group);
    }
}
