using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiConnector.Model
{
    public class Rate
    {
        public DateTime Date { get; private set; }
        public decimal Value { get; private set; }

        public Rate(DateTime date, decimal value)
        {
            Date = date;
            Value = value;
        }
    }
}
