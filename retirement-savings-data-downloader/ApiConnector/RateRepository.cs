using ApiConnector.Model;
using ApiConnector.Properties;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiConnector
{
    public class RateRepository : Repository
    {
        public void Add(Rate rate)
        {

        }

        public void AddRange(int fundId, IReadOnlyCollection<Rate> rates)
        {
            PostToApi<Rate>($"fund/{fundId}/rates", rates);
        }
    }
}
