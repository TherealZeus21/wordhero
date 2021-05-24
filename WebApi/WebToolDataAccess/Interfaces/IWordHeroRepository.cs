using System.Collections.Generic;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;
using WebToolDataAccess.Models;

namespace WebToolDataAccess.Interfaces
{
    public interface IWordHeroRepository
    {
        Task<WordHero> GetWordHero(int id);
        Task<WordHero> CreateWordHero(WordHero lessson);
        Task<IList<WordHero>> GetWordHeroes(string userId);
        Task ChangeWordHeroConfig(int lessonId, string config, string teacherId);
        Task<WordHero> UpdateWordHero(WordHeroDto lessoDto, List<Word> newWords, WordHeroConfig newConfig, string teacherId);
        Task RemoveWordHero(int lessonId, string teacherId);
        Task ChangeFavourite(int lessonId, bool isFavourite);
        Task<StudentResult> SaveExerciseResult(int wordheroId, string groupName, StudentResult studentResult);
        Task<StudentResult> GetExerciseResult(string groupName, int wordHeroId, string studentId1);
        Task<IList<StudentResult>> GetGroupResults(int wordHeroId, string groupName);
        Task<IList<WordHeroShareData>> GetShareData(int wordHeroId);
    }
}
