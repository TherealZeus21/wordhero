using System.Collections.Generic;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;
using WebTool.Model.Request;
using WebToolDataAccess.Models;

namespace WebTool.Service.Interfaces
{
    public interface IWordHeroService
    {
        Task<WordHeroDto> CreateOrUpdateWordHero(WordHeroDto lessoDto, string teacherId);
        Task<WordHeroDto> GetWordHero(int lessonId);

        Task ChangeLessonConfig(int lessonId, string config, string teacherId);
        Task RemoveWordHero(int lessonId, string teacherId);
        Task ChangeFavourite(int lessonId, bool isFavourite);
      
    }
}
