using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;

namespace WebTool.Service.Interfaces
{
    public interface IWordHeroExerciseService
    {
        Task<WordHeroExercise> GetWordHeroExercise(string groupName, int lessonId);

        Task<StudentResult> SaveExerciseResult(int wordHeroId, string groupName, StudentResult studentResult);

        Task<StudentResult> GetExerciseResult(string groupName, int wordHeroId, string studentId1);
        Task<IList<GroupResults>> GetAllGroupResults(int wordHeroId);
        Task<IList<UserResult>> GetGroupResults(int wordHeroId, string groupName);

        Task<object> GetWordHeroSpidegram(int id, string groupName);

    }
}
