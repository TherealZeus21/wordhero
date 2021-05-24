using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;
using WebTool.Model.Request;
using WebTool.Service.Interfaces;
using WebToolDataAccess.Interfaces;
using WebToolDataAccess.Models;

namespace WebTool.Service.Concrete
{
    public class WordHeroService : IWordHeroService
    {
        IWordHeroRepository _lessonRepository;
        IMapper _mapper;


        public WordHeroService(IWordHeroRepository lessonRepository, IMapper mapper)
        {
            _lessonRepository = lessonRepository;
            _mapper = mapper;
        }

        public async Task<WordHeroDto> CreateOrUpdateWordHero(WordHeroDto lessoDto, string teacherId)
        {
            var newWords = lessoDto.Words.Select(w => _mapper.Map<Word>(w)).ToList();
            var newConfig = _mapper.Map<WordHeroConfig>(lessoDto.WordHeroConfig);

            if (lessoDto.Id.HasValue && lessoDto.Id > 0)
            {
                var wordHero = await _lessonRepository.UpdateWordHero(lessoDto, newWords, newConfig, teacherId);
                return _mapper.Map<WordHeroDto>(wordHero);
            }
            else
            {
                var questions = lessoDto.Questions.Select(q => new Question() { Content = q }).ToList();

                var lesson = new WordHero()
                {
                    Name = lessoDto.Title,
                    Words = newWords,
                    CreatedAt = lessoDto.CreatedAt,
                    UserId = teacherId,
                    LessonConfig = newConfig,
                    SpidegramData = lessoDto.SpidegramData,
                    IsFavourite = lessoDto.IsFavourite,
                    Questions = questions,
                };
                var wordHero = await _lessonRepository.CreateWordHero(lesson);
                return _mapper.Map<WordHeroDto>(wordHero);

            }
        }

        public async Task<WordHeroDto> GetWordHero(int lessonId)
        {
            var lesson = await _lessonRepository.GetWordHero(lessonId);
            return _mapper.Map<WordHeroDto>(lesson);
        }

        public async Task ChangeLessonConfig(int lessonId, string config, string teacherId)
        {
            await _lessonRepository.ChangeWordHeroConfig(lessonId, config, teacherId);
        }

        public async Task RemoveWordHero(int lessonId, string teacherId)
        {
            await _lessonRepository.RemoveWordHero(lessonId, teacherId);

        }

        public async Task ChangeFavourite(int lessonId, bool isFavourite)
        {
            await _lessonRepository.ChangeFavourite(lessonId, isFavourite);
        }

  

    }
}
