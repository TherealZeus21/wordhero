using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Interfaces;
using WebToolDataAccess.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebTool.Model.DTO;
using WebTool.Model.DataAccess;

namespace WebToolDataAccess.Repositories
{
    public class WordHeroRepository : IWordHeroRepository
    {

        private readonly DatabaseContext _dbContext;
        public WordHeroRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<WordHero> GetWordHero(int id)
        {
            return await _dbContext.WordHeroes.Include(x => x.LessonConfig).Include(x => x.Words).Include(x => x.LessonConfig).Include(x=>x.WordHeroShareData).ThenInclude(z=>z.StudentResults).Include(x => x.Questions).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<WordHero> CreateWordHero(WordHero wordHero)
        {
            _dbContext.WordHeroes.Add(wordHero);
            await _dbContext.SaveChangesAsync();
            return wordHero;
        }

        public async Task<IList<WordHero>> GetWordHeroes(string teacherId)
        {
            return await _dbContext.WordHeroes.Where(x => x.UserId == teacherId).Include(x => x.Words).ToListAsync();
        }

        public async Task ChangeWordHeroConfig(int lessonId, string config, string teacherId)
        {
            var lessonConfig = await _dbContext.WordHeroes.SingleOrDefaultAsync(x => x.Id == lessonId && x.UserId == teacherId);
            lessonConfig.LessonConfig.Preferences = config;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<WordHero> UpdateWordHero(WordHeroDto lessonDto, List<Word> newWords, WordHeroConfig newConfig, string teacherId)
        {
            var wordHero = _dbContext.WordHeroes.SingleOrDefault(hero => hero.Id == lessonDto.Id && hero.UserId == teacherId);
            wordHero.Name = lessonDto.Title;
            wordHero.SpidegramData = lessonDto.SpidegramData;
            wordHero.IsFavourite = lessonDto.IsFavourite;

            var words = _dbContext.Words.Where(x => x.WordHeroId == lessonDto.Id);
            _dbContext.Words.RemoveRange(words);
            wordHero.Words = newWords;

            var oldConfig = await _dbContext.WordHeroConfigs.SingleOrDefaultAsync(x => x.LessonId == lessonDto.Id);
            _dbContext.WordHeroConfigs.Remove(oldConfig);
            wordHero.LessonConfig = newConfig;

            var questions = _dbContext.Questions.Where(x => x.WordHeroId == lessonDto.Id);
            _dbContext.Questions.RemoveRange(questions);
            wordHero.Questions = lessonDto.Questions.Select(q => new Question() { Content = q }).ToList();

            await _dbContext.SaveChangesAsync();
            return wordHero;
        }

        public async Task RemoveWordHero(int lessonId, string teacherId)
        {
            var wordHero = _dbContext.WordHeroes.SingleOrDefault(hero => hero.Id == lessonId && hero.UserId == teacherId);
            _dbContext.WordHeroes.Remove(wordHero);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ChangeFavourite(int lessonId, bool isFavourite)
        {
            var wordHero = _dbContext.WordHeroes.SingleOrDefault(hero => hero.Id == lessonId);
            wordHero.IsFavourite = isFavourite;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<StudentResult> SaveExerciseResult(int wordHeroId, string groupName, StudentResult studentResult)
        {
            var shareData = await _dbContext.WordHeroShareData.SingleOrDefaultAsync(x => x.WordHeroId == wordHeroId && x.GroupName == groupName);
            studentResult.WordHeroShareData = shareData;
            if (studentResult.Id == 0)
            {
                _dbContext.StudentResults.Add(studentResult);
                await _dbContext.SaveChangesAsync();
                return studentResult;
            }
            else
            {
                var oldResult = _dbContext.StudentResults.SingleOrDefault(res => res.Id == studentResult.Id);
                oldResult.Result = studentResult.Result;
                oldResult.StudentName = studentResult.StudentName;
                await _dbContext.SaveChangesAsync();
                return oldResult;
            }
        }

        public async Task<StudentResult> GetExerciseResult(string groupName, int wordHeroId, string studentId)
        {
            var oldResult = await _dbContext.StudentResults.Include(x => x.WordHeroShareData).Include(x=>x.Result).FirstOrDefaultAsync(x => x.WordHeroShareData.WordHeroId == wordHeroId && x.WordHeroShareData.GroupName == groupName && x.StudentName == studentId);
            return oldResult != null ? oldResult : new StudentResult();
        }


        public async Task<IList<WordHeroShareData>> GetShareData(int wordHeroId)
        {

            return await _dbContext.WordHeroShareData.Include(x=>x.StudentResults).Where(x => x.WordHeroId == wordHeroId).ToListAsync();
        }

        public async Task<IList<StudentResult>> GetGroupResults(int wordHeroId, string groupName)
        {

            return await _dbContext.StudentResults.Include(x=>x.Result).Where(x => x.WordHeroShareData.WordHeroId == wordHeroId && x.WordHeroShareData.GroupName == groupName).ToListAsync();
        }

        public async Task<IList<StudentResult>> GetGroupResults(string groupName)
        {
            return await _dbContext.StudentResults.Include(x => x.WordHeroShareData).Where(x => x.WordHeroShareData.GroupName == groupName).Include(x => x.Result).ToListAsync();
        }
    }
}
