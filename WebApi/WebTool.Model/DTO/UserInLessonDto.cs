using System;
using System.Collections.Generic;
using System.Text;

namespace WebTool.Model.DTO
{
   public  class UserInLessonDto
    {
        public int Id { get; set; }
        public int UserLessonId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}
