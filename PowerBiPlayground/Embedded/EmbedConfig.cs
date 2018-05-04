namespace PowerBiPlayground.Embedded
{
    public class EmbedConfig
    {
        public string ReportId { get; }

        public string EmbedUrl { get; }

        public string Token { get; }

        public EmbedConfig(string reportId, string embedUrl, string token)
        {
            this.ReportId = reportId;
            this.EmbedUrl = embedUrl;
            this.Token = token;
        }
    }
}