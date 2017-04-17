using System.Collections.Generic;
using DataDownloader.Properties;
using System.IO;
using System.Net;

namespace DataDownloader
{
    public class DataDownloader
    {
        public static void DownloadFunds()
        {
            List<FundManager.Fund> funds = FundManager.GetFunds();
            foreach (FundManager.Fund f in funds)
            {
                DownloadFile(f);
            }
        }

        private static bool DownloadFile(FundManager.Fund f)
        {
            string localFilepath = Settings.Default.FilePath;
            if (!Directory.Exists(localFilepath))
            {
                Directory.CreateDirectory(localFilepath);
            }
            string path = Path.Combine(new string[] { localFilepath, f.Filename });
            //string url = string.Format(f.Url, new DateTime(2014, 1, 1).ToShortDateString(), DateTime.Today.ToShortDateString());

            string fileContent = ReadStreamFromUrl(f.Url);

            try { File.WriteAllText(path, fileContent); }
            catch { return false; }
            return true;
        }

        private static string ReadStreamFromUrl(string url)
        {
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();

            StreamReader sr = new StreamReader(resp.GetResponseStream());
            string results = sr.ReadToEnd();
            sr.Close();

            return results;
        }
    }
}
