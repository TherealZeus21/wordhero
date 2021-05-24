using System;
using System.Collections.Generic;
using System.Text;

namespace WebTool.Model.DTO
{
    public class WordHeroListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsFavourite { get; set; }
        public int WordsCount { get; set; }
    }
}
