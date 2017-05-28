using ApiConnector.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace DataDownloader
{
    internal class FundParser
    {
        internal static IReadOnlyCollection<Rate> ParseNN(string contents)
        {
            var result = new HashSet<Rate>();
            object deserializedJson = JsonConvert.DeserializeObject(contents);//,  new JsonConverter[] { new JavaScriptDateTimeConverter() });
            //TODO: sprawdzić RestRequest.DateFormat Unix Timestamps

            JArray deserializedJsonJArray = deserializedJson as JArray;
           
            foreach (JToken course in deserializedJsonJArray[1])
            {
                DateTime courseDate = new DateTime(1970, 1, 1).AddDays((int)(course.First.Value<long>() / 86400000));
                result.Add(new Rate(courseDate, course.Last.Value<decimal>()));
            }
            
            return result;
        }
    }
}