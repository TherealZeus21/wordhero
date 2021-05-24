using System;
using System.Collections.Generic;
using System.Text;
using WebTool.Model.DataAccess;

namespace WebToolDataAccess.Models
{
    public class WordHero
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool IsFavourite { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual IList<Word> Words { get; set; }

        public virtual WordHeroConfig LessonConfig { get; set; }
        public string SpidegramData { get; set; }

        public virtual IList<WordHeroShareData> WordHeroShareData { get; set; }

        public virtual IList<Question> Questions { get; set; }


    }
}
