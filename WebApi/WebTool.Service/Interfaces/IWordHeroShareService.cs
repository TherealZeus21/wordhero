using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;

namespace WebTool.Service.Interfaces
{
    public interface IWordHeroShareService
    {
        public Task<List<WordHeroShareGroupsDto>> GetGroups(int wordheroId);
        Task CreateGroup(WordHeroShareData group);
    }
}
