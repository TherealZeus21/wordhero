using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebTool.Model.DataAccess;
using WebTool.Service.Interfaces;

namespace WordHeroAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordHeroShareController : ControllerBase
    {
        private IWordHeroShareService _wordHeroShare;

        public WordHeroShareController(IWordHeroShareService wordHeroShare)
        {
            _wordHeroShare = wordHeroShare;
        }

        [HttpGet("{lessonId}")]
        public async Task<IActionResult> GetGroups(int lessonId)
        {
            var wordHero = await _wordHeroShare.GetGroups(lessonId);
            return Ok(wordHero);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(WordHeroShareData group)
        {
            if (String.IsNullOrWhiteSpace(group.GroupName))
            {
                return BadRequest();
            }
            await _wordHeroShare.CreateGroup(group);
            return Ok();
        }
    }
}