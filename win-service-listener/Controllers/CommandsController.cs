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

        [HttpGet]
        public dynamic GetPrompt(string command)
        {
            List<string> response = new List<string>();
            using (var ps = PowerShell.Create())
            {
                var results = ps.AddScript(command).Invoke();
                foreach (var result in results)
                {
                    response.Add(result.ToString());
                    Console.WriteLine(result.ToString());
                }
            }
            return response;
        }

        [HttpGet, Route("GetCommandByPath")]
        public dynamic GetCommandByPath(string path, string command)
        {
            try
            {
                string result = string.Empty;
                using (var ps = PowerShell.Create())
                {
                    var results = ps.AddScript($"{command} | Out-String").Invoke();   
                    if(ps.HadErrors) throw new Exception(ps.Streams.Error.ReadAll()[0].ToString());          
                    if(results.Count == 0) throw new Exception("Command not process.");    
                    result = results[0].ToString();
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
                using (var ps = PowerShell.Create())
                {
                    var resultName = ps.AddScript("hostname  | Out-String").Invoke();     
                    result += $"Machine Name: \r {resultName[0].ToString()} \n";
                    var resultIp = ps.AddScript("ipconfig | findstr /i \"ipv4\"  | Out-String").Invoke();     
                    result += $"Address IPV4: \r\n {resultIp[0].ToString()}\n";
                    var resultStatusFireWall = ps.AddScript("netsh advfirewall show currentprofile  | Out-String").Invoke();     
                    result += $"Firewall Settings: \r\n {resultStatusFireWall[0].ToString()}";
                    var resultAntiVirus = ps.AddScript("Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct | Out-String").Invoke();     
                    result += $"AntiVirus Settings: \r\n {resultAntiVirus[0].ToString()}";
                    var resultDotnetVersion = ps.AddScript("dotnet --version | Out-String").Invoke();     
                    result += $"Dotnet Version: \r\n {resultDotnetVersion[0].ToString()}";
                }      
                return result;          
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
