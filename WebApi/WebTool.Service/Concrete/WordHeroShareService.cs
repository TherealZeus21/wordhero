using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;
using WebTool.Service.Interfaces;
using WebToolDataAccess.Interfaces;

namespace WebTool.Service.Concrete
{
    public class WordHeroShareService : IWordHeroShareService
    {
        IWordHeroRepository _lessonRepository;
        IWordHeroShareRepository _shareRepository;
        IMapper _mapper;

        public WordHeroShareService(IWordHeroRepository lessonRepository, IWordHeroShareRepository shareRepository, IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _shareRepository = shareRepository;
            _mapper = mapper;
        }

        public async Task CreateGroup(WordHeroShareData group)
        {
            await _shareRepository.CreateGroup(group);
        }

        public async Task<List<WordHeroShareGroupsDto>> GetGroups(int wordheroId)
        {
            var groups = await _shareRepository.GetGroups(wordheroId);
            return _mapper.Map<List<WordHeroShareGroupsDto>>(groups);
        }
    }
}
