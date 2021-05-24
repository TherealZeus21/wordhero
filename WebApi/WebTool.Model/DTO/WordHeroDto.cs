using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DTO
{
    public class WordHeroDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public List<WordDTO> Words { get; set; }
        public bool IsFavourite { get; set; }
        public DateTime CreatedAt { get; set; }
        public string SpidegramData { get; set; }
        public WordHeroConfigDTO WordHeroConfig { get; set; }
        public List<string> Questions { get; set; }

        public string UserId { get; set; }
    }

    public class WordHeroConfigDTO
    {
        public int Id { get; set; }
        public bool IsPublic { get; set; }
        public string Preferences { get; set; }

        public int LessonId { get; set; }
    }
}
