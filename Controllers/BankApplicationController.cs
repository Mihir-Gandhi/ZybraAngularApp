using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ZybraAngularCoding.Controllers
{
    public class BankApplicationController : Controller
    {
        // GET: BankApplication
        [ActionName("GetBankData")]
        [HttpGet]
        public async Task<string> GetBankData()
        {
            string str, url = "https://intense-everglades-72453.herokuapp.com/api/banks";
            using (var client = new HttpClient())
            {
                str = await client.GetStringAsync(url);
            }
            return str;
        }

        [ActionName("GetCityData")]
        [HttpGet]
        public async Task<string> GetCityData(Banks bank)
        {
            string result = String.Empty;
            string url = "https://intense-everglades-72453.herokuapp.com/api/city/" + bank.bankName;
            using (var client = new HttpClient())
            {
                result = await client.GetStringAsync(url);
            }
            return result;
        }

        [ActionName("GetBranches")]
        [HttpGet]
        public string GetBranches(Branch branch)
        {
            var request = (HttpWebRequest)WebRequest.Create("https://intense-everglades-72453.herokuapp.com/api/branches");

            var postData = "bank_name=" + branch.branchName;
            postData += "&city=" + branch.city;
            var data = Encoding.ASCII.GetBytes(postData);

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = (HttpWebResponse)request.GetResponse();

            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            return responseString;
        }

        public class Banks
        {
            public string bankName { get; set; }
        }

        public class Branch
        {
            public string branchName { get; set; }
            public string city { get; set; }
        }
    }
}