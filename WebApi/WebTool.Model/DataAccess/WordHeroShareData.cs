using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DataAccess
{
   public  class WordHeroShareData
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string Type { get; set; }

        public int WordHeroId { get; set; }
        public virtual WordHero Lesson { get; set; }

        public virtual IList<StudentResult> StudentResults { get; set; }

    }
}
