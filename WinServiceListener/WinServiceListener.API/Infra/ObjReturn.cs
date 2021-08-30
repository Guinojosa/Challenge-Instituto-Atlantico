using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WinServiceListener.API.Infra
{
    public class ObjReturn
    {
        public string ServerInfo { get; set; }
        public string SeverPath { get; set; }
        public string Error { get; set; }
        public string Result {  get; set; }
    }
}
