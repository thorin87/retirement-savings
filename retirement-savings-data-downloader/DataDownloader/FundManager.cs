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
            public int Id { get; private set; }
            public string Name { get; private set; }
            public int ExternalId { get; private set; }

            public string Filename
            {
                get { return Name.Replace(' ', '_') + ".json"; }
            }

            public string Url
            {
                get { return $"https://www.nntfi.pl/?action=quotes.getQuotesValuesAsJSON&unitCategoryId=5&fundId={ExternalId}"; } //&startDate={0}&endDate={1}",
            }

            public Fund(int id, string name, int externalId)
            {
                Id = id;
                Name = name;
                ExternalId = externalId;
            }
        }

        public static List<Fund> GetFunds()
        {
            return new List<Fund>()
            {
                new Fund(3, "NN Gotówkowy (K)", 8),
                new Fund(5, "NN Obligacji (K)", 3),
                new Fund(11, "NN (L) Globalny Spółek Dywidendowych (K)", 18),
                new Fund(15, "NN (L) Stabilny Globalnej Alokacji (K)", 1500037),
                new Fund(23, "NN Perspektywa 2045 (K)", 26)
            };
        }
    }
}
