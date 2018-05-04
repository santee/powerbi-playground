namespace PowerBiPlayground.Controllers
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.PowerBI.Api.V2;
    using Microsoft.PowerBI.Api.V2.Models;
    using Microsoft.Rest;

    using PowerBiPlayground.Embedded;

    [Route("api/powerbi/token")]
    public class PowerBiTokenController : Controller
    {
        private readonly AccessTokenQuery accessTokenQuery;

        private readonly Settings settings;

        public PowerBiTokenController(AccessTokenQuery accessTokenQuery, Settings settings)
        {
            this.accessTokenQuery = accessTokenQuery;
            this.settings = settings;
        }

        [HttpGet]
        [Route("")]
        [ProducesResponseType(typeof(EmbedConfig), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Index(CancellationToken cancellationToken)
        {
            string accessToken;
            try
            {
                accessToken = await this.accessTokenQuery.GetTokenAsync(cancellationToken);
            }
            catch (Exception)
            {
                return this.Forbid();
            }

            var credentials = new TokenCredentials(accessToken, "Bearer");

            using (var client = new PowerBIClient(new Uri(this.settings.Cloud.ApiUrl), credentials))
            {
                var reportParameters = await this.GetReportParametersOrDefaultAsync(client, cancellationToken);
                if (reportParameters == null)
                {
                    return this.NotFound(); //no suitable report to display
                }

                var generateTokenParams = new GenerateTokenRequest("view");
                var token = await client.Reports.GenerateTokenInGroupAsync(
                                reportParameters.GroupId,
                                reportParameters.Report.Id,
                                generateTokenParams,
                                cancellationToken);

                return this.Ok(
                    new EmbedConfig(reportParameters.Report.Id, reportParameters.Report.EmbedUrl, token.Token));
            }
        }

        private async Task<ReportParameters> GetReportParametersOrDefaultAsync(PowerBIClient client, CancellationToken cancellationToken)
        {
            Report report = null;
            string groupId = null;

            if (!string.IsNullOrWhiteSpace(this.settings.GroupId))
            {
                groupId = this.settings.GroupId;
                var allReports = await client.Reports.GetReportsInGroupAsync(this.settings.GroupId, cancellationToken);
                report = allReports.Value.FirstOrDefault();
            }
            else
            {
                var groups = await client.Groups.GetGroupsAsync(cancellationToken: cancellationToken);
                var group = groups.Value.FirstOrDefault();
                if (@group != null)
                {
                    groupId = group.Id;
                    report = (await client.Reports.GetReportsInGroupAsync(@group.Id, cancellationToken)).Value.FirstOrDefault();
                }
            }

            if ((report != null) && (groupId != null))
            {
                return new ReportParameters(report, groupId);
            }
            else
            {
                return null;
            }
        }

        private class ReportParameters
        {
            public Report Report { get; }
        
            public string GroupId { get; }

            public ReportParameters(Report report, string groupId)
            {
                this.Report = report;
                this.GroupId = groupId;
            }
        }
    }
}