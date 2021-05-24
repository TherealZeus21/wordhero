using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DTO
{
    public class UserLessonDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<WordLesson> Words { get; set; }
        public int UserId { get; set; }
        public LessonConfigDto LessonConfig { get; set; }
    }

    public class WordLesson
    {
        public int Id { get; set; }
        public int NumOfUse { get; set; }
        public string Name { get; set; }
    }
}
