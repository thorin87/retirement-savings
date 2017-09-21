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
            public FundType Type { get; private set; }

            public string Filename
            {
                get
                {
                    if (Type == FundType.NationaleNederlanden)
                        return Name.Replace(' ', '_') + ".json";
                    if (Type == FundType.PZU)
                        return Name.Replace(' ', '_') + ".xls";
                    return Name.Replace(' ', '_') + ".dat";
                }
            }

            public string Url
            {
                get
                {
                    if (Type == FundType.NationaleNederlanden)
                        return $"https://www.nntfi.pl/?action=quotes.getQuotesValuesAsJSON&unitCategoryId=5&fundId={ExternalId}"; //&startDate={0}&endDate={1}",
                    if (Type == FundType.PZU)
                        return String.Format("https://www.pzu.pl/portal-portlet-funds/fundRatingsExcelFile?from=2017-01-01&to={0}&fids=1330", DateTime.Now.ToString("yyyy-MM-dd"));
                    throw new InvalidOperationException("Brak url");
                }
            }

            public Fund(int id, string name, int externalId, FundType type)
            {
                Id = id;
                Name = name;
                ExternalId = externalId;
                Type = type;
            }
        }

        public static List<Fund> GetFunds()
        {
            return new List<Fund>()
            {
                new Fund(3, "NN Gotówkowy (K)", 8, FundType.NationaleNederlanden),
                new Fund(5, "NN Obligacji (K)", 3, FundType.NationaleNederlanden),
                new Fund(11, "NN (L) Globalny Spółek Dywidendowych (K)", 18, FundType.NationaleNederlanden),
                new Fund(15, "NN (L) Stabilny Globalnej Alokacji (K)", 1500037, FundType.NationaleNederlanden),
                new Fund(23, "NN Perspektywa 2045 (K)", 26, FundType.NationaleNederlanden),
                new Fund(24, "DFE PZU", 0, FundType.PZU)
            };
        }
    }
}
