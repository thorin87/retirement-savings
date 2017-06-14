using System.Collections.Generic;
using DataDownloader.Properties;
using System.IO;
using System.Net;
using ApiConnector.Model;
using System.IO.Compression;
using System.Text;

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
                IReadOnlyCollection<Rate> rates = new HashSet<Rate>();
                switch (fund.Type)
                {
                    case FundType.NationaleNederlanden:
                        rates = FundParser.ParseNN(result.Contents);
                        break;
                    case FundType.PZU:
                        rates = FundParser.ParsePZU(result.FilePath);
                        break;
                }
                
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

            byte[] fileContent = ReadFileFromUrl(f.Url);

            try { File.WriteAllBytes(path, fileContent); }
            catch { return new DownloadResult { IsSuccess = false }; }
            return new DownloadResult { IsSuccess = true, FilePath = path, Contents = Encoding.UTF8.GetString(fileContent) };
        }

        private static byte[] ReadFileFromUrl(string url)
        {
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
            HttpWebResponse resp;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
            }
            catch (WebException webEx)
            {
                return new byte[0];
            }
            
            using (MemoryStream ms = new MemoryStream())
            {
                resp.GetResponseStream().CopyTo(ms);
                return ms.ToArray();
            }
        }
    }
}
