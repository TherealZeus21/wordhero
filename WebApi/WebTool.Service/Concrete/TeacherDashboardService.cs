using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DTO;
using WebTool.Service.Interfaces;
using WebToolDataAccess.Interfaces;
using WebToolDataAccess.Models;

namespace WebTool.Service.Concrete
{
    public class TeacherDashboardService : ITeacherDashboardService
    {
        IWordHeroRepository _WordHeroRepository;
        IMapper _mapper;

        public TeacherDashboardService(IWordHeroRepository lessonRepository, IMapper mapper)
        {
            _WordHeroRepository = lessonRepository;
            _mapper = mapper;
        }

        public async Task<IList<WordHeroListDto>> GetLessons(string teacherId)
        {
            var lessons = await _WordHeroRepository.GetWordHeroes(teacherId);
            return _mapper.Map<WordHeroListDto[]>(lessons);
        }
    }
}
