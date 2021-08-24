using System;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
    }
}
