using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;
using WebTool.Service.Concrete;
using WebTool.Service.Interfaces;
using WebToolDataAccess.Interfaces;

namespace WebTool.Service.Concrete
{
    public class WordHeroExerciseService : IWordHeroExerciseService
    {

        IWordHeroRepository _lessonRepository;
        IMapper _mapper;


        public WordHeroExerciseService(IWordHeroRepository lessonRepository, IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _mapper = mapper;
        }


        public async Task<IList<GroupResults>> GetAllGroupResults(int id)
        {
            var groupResults = await _lessonRepository.GetShareData(id);

            var mapped = new List<GroupResults>();
            foreach (var group in groupResults)
            {
                var result = new GroupResults();
                result.GroupName = group.GroupName;
                result.Update = group.StudentResults.OrderByDescending(x => x.UpdateTime).FirstOrDefault()?.UpdateTime;
                mapped.Add(result);
            }

            return mapped;
        }

        public async Task<StudentResult> GetExerciseResult(string groupName, int wordHeroId, string studentId)
        {
            return await _lessonRepository.GetExerciseResult(groupName, wordHeroId, studentId);
        }

        public async Task<IList<UserResult>> GetGroupResults(int wordHeroId, string groupName)
        {
            var groupResults = await _lessonRepository.GetGroupResults(wordHeroId, groupName);
            return _mapper.Map<List<UserResult>>(groupResults);
        }

        public async Task<WordHeroExercise> GetWordHeroExercise(string groupName, int lessonId)
        {
            var lesson = await _lessonRepository.GetWordHero(lessonId);
            //TODO: fix
            //if (lesson.WordHeroShareData.GroupName != groupName) { throw new ArgumentOutOfRangeException(); }
            return _mapper.Map<WordHeroExercise>(lesson);
        }

        public async Task<StudentResult> SaveExerciseResult(int wordheroId, string groupName, StudentResult studentResult)
        {
            var result = await _lessonRepository.SaveExerciseResult(wordheroId, groupName, studentResult);
            return result;
        }


        public async Task<object> GetWordHeroSpidegram(int id, string groupName)
        {
            var lesson = await _lessonRepository.GetWordHero(id);
            if(!lesson.WordHeroShareData.Any(x=>x.GroupName == groupName))
            {
                return new WordHeroShareSpidegram();
            }
            return _mapper.Map<WordHeroShareSpidegram>(lesson);
        }
    }
}
