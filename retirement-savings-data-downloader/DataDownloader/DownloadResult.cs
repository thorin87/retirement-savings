using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataDownloader
{
    public class DownloadResult
    {
        public bool IsSuccess { get; set; }
        public string FilePath { get; set; }
        public string Contents { get; set; }
    }
}
