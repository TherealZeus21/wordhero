using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebTool.Model.DTO
{
    public class WordHeroExercise
    {
        public int WordHeroId { get; set; }
        public string Name { get; set; }
        public WordHeroConfig WordHeroConfig { get; set; }
        public List<string> Words { get; set; }
    }
}
