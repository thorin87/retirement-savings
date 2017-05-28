using ApiConnector.Properties;
using RestSharp;
using System.Collections.Generic;

namespace ApiConnector
{
    public class Repository
    {
        protected virtual void PostToApi<T>(string resource, IReadOnlyCollection<T> body)
        {
            var client = new RestClient(Settings.Default.ApiUrl);

            var request = new RestRequest(resource, Method.POST);
            request.JsonSerializer = new RestSharp.Newtonsoft.Json.NewtonsoftJsonSerializer();
            request.AddJsonBody(new { token = Settings.Default.AdminToken, data = body });

            // execute the request
            IRestResponse response = client.Execute(request);
            var content = response.Content;
        }
    }
}