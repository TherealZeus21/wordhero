using System;
using System.Collections.Generic;
using System.Text;

namespace WebTool.Model.Request
{
    public class AssignUserIntoLesson
    {
        public int UserId { get; set; }
        public int LessonId { get; set; }
    }
}
