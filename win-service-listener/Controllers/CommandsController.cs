using System;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace win_service_listener.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommandsController : ControllerBase
    {

        private readonly ILogger<CommandsController> _logger;

        public CommandsController(ILogger<CommandsController> logger)
        {
            _logger = logger;
        }

        [HttpGet, Route("GetCommandByPath")]
        public string GetCommandByPath(string path, string command)
        {
            try
            {
                string result = string.Empty;
                bool isCd = command.ToLower().Contains("cd");
                using (var ps = PowerShell.Create())
                {
                    if (!String.IsNullOrEmpty(path)) ps.AddScript($"cd {path}").Invoke();
                    var results = ps.AddScript($"{command} | Out-String").Invoke();
                    if (ps.HadErrors) throw new Exception(ps.Streams.Error.ReadAll()[0].ToString());
                    if (isCd)
                    {
                        var resultPath = ps.AddScript("Get-Location").Invoke();
                        result = resultPath[0].ToString();
                    }
                    else if (results.Count == 0) throw new Exception("Command not process.");
                    else result = results[0].ToString();
                }
                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, Route("Init")]
        public dynamic Init()
        {
            try
            {
                string result = string.Empty;
                string currentPath = string.Empty;
                using (var ps = PowerShell.Create())
                {
                    var resultName = ps.AddScript("hostname  | Out-String").Invoke();
                    result += $"Machine Name: \r {resultName[0].ToString()} \n";
                    var resultIp = ps.AddScript("ipconfig | findstr /i \"ipv4\"  | Out-String").Invoke();
                    result += $"Address IPV4: \r\n {resultIp[0].ToString()}\n";
                    var resultStatusFireWall = ps.AddScript("netsh advfirewall show currentprofile state  | Out-String").Invoke();
                    result += $"Firewall Status: \r\n {resultStatusFireWall[0].ToString()}";
                    var resultAntiVirus = ps.AddScript("Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct | Select displayName | Out-String").Invoke();
                    result += $"AntiVirus Installed: \r\n {resultAntiVirus[0].ToString()}";
                    var resultDotnetVersion = ps.AddScript("dotnet --version | Out-String").Invoke();
                    result += $"Dotnet Version: \r\n {resultDotnetVersion[0].ToString()}\n";
                    var resultHdState = ps.AddScript("Get-PSDrive | Select-Object Name, @{ E={\"$([math]::round($_.Used/1GB,2))\"}; L='Used' }, @{ E={\"$([math]::round($_.Free/1GB,2))\"}; L='Free' } | where {($_.Used -notlike 0)} | Out-String").Invoke();
                    result += $"Size of HDD's (GB): \r\n {resultHdState[0].ToString()}";
                    var resultPath = ps.AddScript("Get-Location").Invoke();
                    currentPath += resultPath[0].ToString();
                }
                return result;
                // return new { value_init = result, path = currentPath };
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
