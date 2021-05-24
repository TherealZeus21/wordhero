using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DTO
{
    public class WordHeroShareSpidegram
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WordHeroConfig WordHeroConfig { get; set; }
        public string SpidegramData { get; set; }
        public List<string> Questions { get; set; }

    }
}
