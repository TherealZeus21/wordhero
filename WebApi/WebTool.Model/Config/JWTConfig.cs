using System;
using System.Collections.Generic;
using System.Text;

namespace WebTool.Model.Config
{
    public class JWTConfig
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int TokenExpiresTime { get; set; }
    }
}
