namespace PowerBiPlayground.Embedded
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;

    using Newtonsoft.Json;

    public class AccessTokenQuery
    {
        private const string PowerBiResourceUrl = "https://analysis.windows.net/powerbi/api";

        private const string PowerBiTokenUrl = "https://login.microsoftonline.com/be2f8daf-486c-46c1-a80e-e36d68608684/oauth2/token";

        private readonly Settings settings;

        public AccessTokenQuery(Settings settings)
        {
            this.settings = settings;
        }

        public async Task<string> GetTokenAsync(CancellationToken cancellationToken)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                var result = await client.PostAsync(
                                  new Uri(this.settings.Cloud.TokenUrl),
                                  new FormUrlEncodedContent(
                                      new[]
                                          {
                                              new KeyValuePair<string, string>("resource", PowerBiResourceUrl),
                                              new KeyValuePair<string, string>("client_id", this.settings.ClientId),
                                              new KeyValuePair<string, string>("grant_type", "password"),
                                              new KeyValuePair<string, string>("username", this.settings.Username),
                                              new KeyValuePair<string, string>("password", this.settings.Password),
                                              new KeyValuePair<string, string>("scope", "openid"),
                                          }),
                                  cancellationToken);
                if (result.IsSuccessStatusCode)
                {
                    var response = await result.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<OAuthTokenResult>(response).AccessToken;
                }
                else
                {
                    throw new Exception("Cannot load OAuth access token");
                }
            }
        }
    }
}