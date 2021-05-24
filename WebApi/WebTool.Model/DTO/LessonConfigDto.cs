using System;
using System.Collections.Generic;
using System.Text;

namespace WebTool.Model.DTO
{
   public  class LessonConfigDto
    {
        public int Id { get; set; }
        public string Preferences { get; set; }
        public bool IsPublic { get; set; }
    }
}
