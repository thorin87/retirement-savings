using System.Collections.Generic;
using DataDownloader.Properties;
using System.IO;
using System.Net;
using ApiConnector.Model;
using System.IO.Compression;
using System.Text;
using System;

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
                DownloadResult result = CheckForCatchedFile(fund.Filename);
                if (!result.IsSuccess)
                    result = DownloadFile(fund);
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

        private static DownloadResult CheckForCatchedFile(string filename)
        {
            string path = GetPathToFile(filename);
            if (File.Exists(path) && File.GetLastWriteTime(path).Date == DateTime.Now.Date)
            {
                return new DownloadResult { IsSuccess = true, FilePath = path, Contents = File.ReadAllText(path) };
            }
            return new DownloadResult { IsSuccess = false };
        }

        private static DownloadResult DownloadFile(FundManager.Fund f)
        {
            string path = GetPathToFile(f.Filename);


            bool tls12 = true;
            if (f.Type == FundType.PZU)
            {
                tls12 = false;
            }

            byte[] fileContent = ReadFileFromUrl(f.Url, tls12);

            try {
                File.WriteAllBytes(path, fileContent);
                Console.WriteLine($"File from url {f.Url} saved to {path}");
            }
            catch { return new DownloadResult { IsSuccess = false }; }
            return new DownloadResult { IsSuccess = true, FilePath = path, Contents = Encoding.UTF8.GetString(fileContent) };
        }

        private static string GetPathToFile(string filename)
        {
            string localFilepath = Settings.Default.FilePath;
            if (!Directory.Exists(localFilepath))
            {
                Directory.CreateDirectory(localFilepath);
            }
            return Path.Combine(new string[] { localFilepath, filename });
        }

        private static byte[] ReadFileFromUrl(string url, bool tls12 = true)
        {
            if (tls12)
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            }
            else
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
            }
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
            HttpWebResponse resp;
            try
            {
                resp = (HttpWebResponse)req.GetResponse();
            }
            catch (WebException webEx)
            {
                Console.WriteLine($"Błąd pobierania {url}: {webEx.Message}");
                if (webEx.InnerException != null)
                {
                    Console.WriteLine(webEx.InnerException.Message);
                }
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
