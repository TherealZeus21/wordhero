using System;
using System.Collections.Generic;
using System.Text;

namespace WebToolDataAccess.Models
{
   public class Word
    {
        public string Id { get; set; }

        public string Value { get; set; }

        public int WordHeroId { get; set; }
        public virtual WordHero WordHero { get; set; }
    }
}
