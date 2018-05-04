namespace PowerBiPlayground
{
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;

    public class Settings
    {
        [Required]
        public string ClientId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string GroupId { get; set; }

        public CloudSettings Cloud { get; set; }

        public class CloudSettings
        {
            [DefaultValue("https://analysis.windows.net/powerbi/api")]
            public string ResourceUrl { get; set; }

            [Required]
            public string TokenUrl { get; set; }

            [Required]
            [DefaultValue("https://api.powerbi.com/")]
            public string ApiUrl { get; set; }
        }
    }
}