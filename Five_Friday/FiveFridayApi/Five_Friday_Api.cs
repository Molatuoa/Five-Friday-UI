using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;


public class Five_Friday_Api
{
    private const string BaseUrl = "http://localhost:9387/api/";
    public static T CallService<T>(RestFunctions objFunction, List<CParameter> lstParameters, RestSharp.Method Method) where T : new()
    {
        var client = new RestClient(BaseUrl);
        RestRequest request = new RestRequest(objFunction.ToString(), Method);

        foreach (CParameter objParameter in lstParameters)
            request.AddParameter(objParameter.Key, objParameter.Value, objParameter.Type);

        var response = client.Execute<T>(request);
        if (response.StatusDescription == "OK")
        {
            if (response.Data != null)
                return response.Data;
            else
            {
                object[] temp = JsonConvert.DeserializeObject<object[]>(response.Content);
                var arr = (T)Convert.ChangeType(temp, typeof(T));

                string EncondedText = HttpUtility.HtmlDecode(response.Content);
                JsonSerializer json = new JsonSerializer();
                StringReader sr = new StringReader(EncondedText);
                JsonTextReader reader = new JsonTextReader(sr);

                //T lst = JsonConvert.DeserializeObject<T>(response.Content);

                T data = (T)json.Deserialize(reader, typeof(T));
                //var data = JsonConvert.DeserializeObject<T>(response.Content);
                return data;
            }
        }
        else
        {
            return response.Data;
        }

    }


}
public class CParameter
{
    public string Key { get; set; }
    public string Value { get; set; }
    public ParameterType Type { get; set; }

    public CParameter(string sKey, string objValue, ParameterType objType = ParameterType.QueryString)
    {
        Key = sKey;
        Value = objValue;
        Type = objType;
    }
}
public enum RestFunctions
{
    Login = 1,
    Customers = 2,
    CustomerContacts = 3
}