using System;
using System.Collections.Generic;
using System.Text;

namespace WebToolDataAccess.Models
{
    public class WordHeroConfig
    {
        public int Id { get; set; }
        public bool IsPublic { get; set; }
        public string Preferences { get; set; }

        public int LessonId { get; set; }
        public virtual WordHero Lesson { get; set; }
    }
}
