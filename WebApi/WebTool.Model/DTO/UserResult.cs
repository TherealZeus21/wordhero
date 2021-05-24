using System;
using System.Collections.Generic;
using System.Text;
using WebTool.Model.DataAccess;

namespace WebTool.Model.DTO
{
    public class UserResult
    {
        public string Name { get; set; }
        public List<WordResult> Words { get; set; }
    }
}
