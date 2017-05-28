using System.Collections.Generic;
using DataDownloader.Properties;
using System.IO;
using System.Net;
using ApiConnector.Model;

namespace DataDownloader
{
    public class DataDownloader
    {
        public static void DownloadFundRatesAndSaveToApi()
        {
            List<FundManager.Fund> funds = FundManager.GetFunds();
            var repository = new ApiConnector.RateRepository();
            foreach (FundManager.Fund fund in funds)
            {
                DownloadResult result = DownloadFile(fund);
                IReadOnlyCollection<Rate> rates = FundParser.ParseNN(result.Contents);
                repository.AddRange(fund.Id, rates);
            }
        }

        private static DownloadResult DownloadFile(FundManager.Fund f)
        {
            string localFilepath = Settings.Default.FilePath;
            if (!Directory.Exists(localFilepath))
            {
                Directory.CreateDirectory(localFilepath);
            }
            string path = Path.Combine(new string[] { localFilepath, f.Filename });
            //string url = string.Format(f.Url, new DateTime(2017, 1, 1).ToShortDateString());

            string fileContent = ReadStreamFromUrl(f.Url);

            try { File.WriteAllText(path, fileContent); }
            catch { return new DownloadResult { IsSuccess = false }; }
            return new DownloadResult { IsSuccess = true, FilePath = path, Contents = fileContent };
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
