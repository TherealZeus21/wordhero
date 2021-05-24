using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DataAccess
{
    public class StudentResult
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public virtual IList<WordResult> Result { get; set; }
        public DateTime UpdateTime { get; set; }

        public int WordHeroShareDataId { get; set; }
        public virtual WordHeroShareData WordHeroShareData { get; set; }
    }
}
