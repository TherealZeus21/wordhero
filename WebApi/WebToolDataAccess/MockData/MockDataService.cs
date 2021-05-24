using System;
using System.Collections.Generic;
using System.Text;
using WebToolDataAccess.Models;

namespace WebToolDataAccess.MockData
{
    public static class MockDataService
    {



        public static List<WordHero> Lessons = new List<WordHero>
        {
            {
                new WordHero { Id = 1, Name = "Economy", IsFavourite = true,UserId="2864e560-92f7-4e0a-9bde-1df18c8c01aa", CreatedAt=DateTime.UtcNow.AddDays(-3), Words = Words,
                SpidegramData = @"{""nodes"":[{""data"":{""id"":""model"",""label"":""model""},""position"":{""x"":167,""y"":214},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""privacy"",""label"":""privacy""},""position"":{""x"":130,""y"":157},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""software"",""label"":""software""},""position"":{""x"":152,""y"":108},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""eh-preview-active""},{""data"":{""id"":""technology"",""label"":""technology""},""position"":{""x"":700,""y"":100},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""audit"",""label"":""audit""},""position"":{""x"":900,""y"":100},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""access"",""label"":""access""},""position"":{""x"":100,""y"":300},""group"":""nodes"",""removed"":false,""selected"":true,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""network"",""label"":""network""},""position"":{""x"":219,""y"":236},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""eh-preview-active""},{""data"":{""id"":""internet"",""label"":""internet""},""position"":{""x"":500,""y"":300},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""eh-preview-active""},{""data"":{""id"":""malware"",""label"":""malware""},""position"":{""x"":700,""y"":300},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""security"",""label"":""security""},""position"":{""x"":900,""y"":300},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""cyber"",""label"":""cyber""},""position"":{""x"":100,""y"":500},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""issues"",""label"":""issues""},""position"":{""x"":300,""y"":500},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""device"",""label"":""device""},""position"":{""x"":500,""y"":500},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""public"",""label"":""public""},""position"":{""x"":700,""y"":500},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""hackers"",""label"":""hackers""},""position"":{""x"":900,""y"":500},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""promotions"",""label"":""promotions""},""position"":{""x"":100,""y"":700},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""trails"",""label"":""trails""},""position"":{""x"":300,""y"":700},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""strategy"",""label"":""strategy""},""position"":{""x"":500,""y"":700},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""},{""data"":{""id"":""provider"",""label"":""provider""},""position"":{""x"":700,""y"":700},""group"":""nodes"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":false,""classes"":""""}],""edges"":[{""data"":{""source"":""internet"",""target"":""network"",""id"":""39cb777a-f37f-47d2-a45f-9635bf53e5c8""},""position"":{""x"":0,""y"":0},""group"":""edges"",""removed"":false,""selected"":false,""selectable"":true,""locked"":false,""grabbable"":true,""pannable"":true,""classes"":""""}]}"
                }
            }
        };

        public static List<Word> Words = new List<Word>
        {
            new Word { Id = "1", Value = "model", WordHeroId=Lessons[0].Id },
            new Word { Id = "2", Value = "privacy", WordHeroId=Lessons[0].Id },
            new Word { Id = "3", Value = "software", WordHeroId=Lessons[0].Id },
            new Word { Id = "4", Value = "technology", WordHeroId=Lessons[0].Id },
            new Word { Id = "5", Value = "audit", WordHeroId=Lessons[0].Id },
            new Word { Id = "6", Value = "access", WordHeroId=Lessons[0].Id },
            new Word { Id = "7", Value = "network", WordHeroId=Lessons[0].Id },
            new Word { Id = "8", Value = "internet", WordHeroId=Lessons[0].Id },
            new Word { Id = "9", Value = "malware", WordHeroId=Lessons[0].Id },
            new Word { Id = "10", Value = "security", WordHeroId=Lessons[0].Id },
            new Word { Id = "11", Value = "cyber", WordHeroId=Lessons[0].Id },
            new Word { Id = "12", Value = "issues", WordHeroId=Lessons[0].Id },
            new Word { Id = "13", Value = "device", WordHeroId=Lessons[0].Id },
            new Word { Id = "14", Value = "public", WordHeroId=Lessons[0].Id },
            new Word { Id = "15", Value = "hackers", WordHeroId=Lessons[0].Id },
            new Word { Id = "16", Value = "promotions", WordHeroId=Lessons[0].Id },
            new Word { Id = "17", Value = "trails", WordHeroId=Lessons[0].Id },
            new Word { Id = "18", Value = "strategy", WordHeroId=Lessons[0].Id },
            new Word { Id = "19", Value = "provider", WordHeroId=Lessons[0].Id }
        };


        public static List<WordHeroConfig> WordHeroConfigs = new List<WordHeroConfig>
        {
            new WordHeroConfig{ Id = 1, IsPublic = true, LessonId = Lessons[0].Id, Preferences = "{\"background\":\"blue\",\"backgroundImage\":null}"}
        };

        //public static List<WordToLesson> WordToLessons = new List<WordToLesson>
        //{
        //        new WordToLesson { Id = 1, LessonId = Lessons[0].Id, WordId = Words[0].Id },
        //        new WordToLesson { Id = 2, LessonId = Lessons[0].Id, WordId = Words[1].Id }
        //};

        //public static List<UserLesson> UserLessons = new List<UserLesson>
        //{
        //    new UserLesson {Id = 1, UserId = Users[0].Id, CreatedAt = DateTime.Now.AddDays(-3), LessonId = Lessons[0].Id}
        //};

        //public static List<LessonConfig> LessonConfigs = new List<LessonConfig>
        //{
        //    new LessonConfig{ Id = 1, IsPublic = true, LessonId = Lessons[0].Id, Preferences = "{\"background\":\"blue\",\"backgroundImage\":null}"}
        //};

        //public static List<UserLessonWords> UserLessonWords = new List<UserLessonWords>
        //{
        //    new UserLessonWords{ Id = 1, UserLessonId = UserLessons[0].Id, WordId = Words[0].Id, NumerOfUse = 3 },
        //    new UserLessonWords{ Id = 2, UserLessonId = UserLessons[0].Id, WordId = Words[1].Id, NumerOfUse = 6 }
        //};
    }

}