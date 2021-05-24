using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebTool.Model.DataAccess;
using WebTool.Service.Interfaces;

namespace WordHeroAPI.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class WordHeroExerciseController : ControllerBase
    {
        private IWordHeroService _wordHeroService;
        private IWordHeroExerciseService _wordHeroExerciseService;

        public WordHeroExerciseController(IWordHeroService wordHeroService, IWordHeroExerciseService wordHeroExerciseService)
        {
            _wordHeroService = wordHeroService;
            _wordHeroExerciseService = wordHeroExerciseService;
        }

        [HttpGet("{wordHeroId}/{groupName}")]
        public async Task<IActionResult> GetWordHeroExercise(int wordHeroId, string groupName)
        {
            return Ok(await _wordHeroExerciseService.GetWordHeroExercise(groupName, wordHeroId));
        }

        [HttpGet("{wordHeroId}/{groupName}/spidegram")]
        public async Task<IActionResult> GetWordHeroSpidegram(int wordHeroId, string groupName)
        {
            return Ok(await _wordHeroExerciseService.GetWordHeroSpidegram(wordHeroId, groupName));
        }

        [HttpGet("{wordHeroId}/{groupName}/{studentId}/result")]
        public async Task<IActionResult> GetExerciseResult(int wordHeroId, string groupName, string studentId)
        {
            return Ok(await _wordHeroExerciseService.GetExerciseResult(groupName, wordHeroId, studentId));
        }

        [HttpGet("groups/{wordHeroId}")]
        public async Task<IActionResult> GetAllGroups(int wordHeroId)
        {
            return Ok(await _wordHeroExerciseService.GetAllGroupResults(wordHeroId));
        } 

        
        [HttpPost("{wordHeroId}/{groupName}")]
        public async Task<IActionResult> SaveResult(int wordHeroId, string groupName, StudentResult studentResult)
        {
            return Ok(await _wordHeroExerciseService.SaveExerciseResult(wordHeroId, groupName, studentResult));
        }

        [HttpGet("results/{wordHeroId}/{groupName}")]
        public async Task<IActionResult> GetHeroResult(int wordHeroId, string groupName)
        {
            return Ok(await _wordHeroExerciseService.GetGroupResults(wordHeroId, groupName));
        }


 
    }
}