using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DataAccess
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        
        public int WordHeroId { get; set; }

        public virtual WordHero WordHero { get; set; }

    }
}
