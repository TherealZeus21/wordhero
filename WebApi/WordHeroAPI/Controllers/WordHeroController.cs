using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebTool.Model.DTO;
using WebTool.Service.Interfaces;

namespace WordHeroAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordHeroController : BaseAPIController
    {
        private IWordHeroService _wordHeroService;

        public WordHeroController(IWordHeroService wordHeroService)
        {
            _wordHeroService = wordHeroService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLessonDetails(int id)
        {
            var wordhero = await _wordHeroService.GetWordHero(id);
            if (wordhero.UserId != LoggedInUserGuid)
            {
                return Unauthorized();
            }

            return Ok(wordhero);
        }

        [HttpPut("{lessonId}")]
        public async Task<IActionResult> UpdateLesson(int lessonId, WordHeroDto lesson)
        {
            var wordHero = await _wordHeroService.CreateOrUpdateWordHero(lesson, LoggedInUserGuid);
            return Ok(wordHero);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLesson(WordHeroDto lesson)
        {
            var wordHero = await _wordHeroService.CreateOrUpdateWordHero(lesson, LoggedInUserGuid);
            return Ok(wordHero);
        }

        [HttpDelete("{lessonId}")]
        public async Task<IActionResult> RemoveLesson(int lessonId)
        {
            await _wordHeroService.RemoveWordHero(lessonId, LoggedInUserGuid);
            return Ok();
        }

        [HttpPut("favourite/{lessonId}/{isFavourite}")]
        public async Task<IActionResult> ToggleFavourite(int lessonId, bool isFavourite)
        {
            await _wordHeroService.ChangeFavourite(lessonId, isFavourite);
            return Ok();
        }
    }
}