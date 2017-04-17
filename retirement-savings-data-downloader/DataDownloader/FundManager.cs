using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataDownloader
{
    public class FundManager
    {
        public struct Fund
        {
            public string Name;
            public string Filename;
            public string Url;
            public string WebPage { get; internal set; }
        }

        public static List<Fund> GetFunds()
        {
            var result = new List<Fund>();
            result.Add(new Fund()
            {
                Name = "ING Obligacji",
                Filename = "ING_Obligacji_(K).txt",
                Url = "https://www.nntfi.pl/?action=quotes.getQuotesValuesAsJSON&unitCategoryId=5&fundId=3", //&startDate={0}&endDate={1}",
                WebPage = "https://www.nntfi.pl/fundusze-inwestycyjne/fundusze-obligacji/nn-obligacji?unitsCategoryId=K"
            });
            result.Add(new Fund()
            {
                Name = "ING Perspektywa 2045",
                Filename = "ING_Perspektywa_2045_(K).txt",
                Url = "https://www.nntfi.pl/?action=quotes.getQuotesValuesAsJSON&unitCategoryId=5&fundId=26", //&startDate={0}&endDate={1}",
                WebPage = "https://www.nntfi.pl/fundusze-inwestycyjne/fundusze-cyklu-zycia/nn-perspektywa-2045?unitsCategoryId=K"
            });
            result.Add(new Fund()
            {
                Name = "ING Stabilny Globalnej Alokacji (L)",
                Filename = "ING_(L)_Stabilny_Globalnej_Alokacji_(K).txt",
                Url = "https://www.nntfi.pl/?action=quotes.getQuotesValuesAsJSON&fundId=1500037&unitCategoryId=5",
                WebPage = "https://www.nntfi.pl/fundusze-inwestycyjne/fundusze-mieszane/nn-stabilny-globalnej-alokacji?unitsCategoryId=K"
            });
            return result;
        }
    }
}
