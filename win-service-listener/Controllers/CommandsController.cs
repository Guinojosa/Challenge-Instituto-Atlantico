using System;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using win_service_listener.Infra;
using win_service_listener.Service;

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
        public dynamic GetCommandByPath(string path, string command)
        {
            try
            {
                string result = PowerShellService.ExecuteCommandbyPath(path, command);
                _logger.LogInformation($"\nCommand: {command} \n Result: {result}");
                return new {result = result};
            }
            catch (Exception ex)
            {
                return new {error = ex.Message};
            }
        }

        [HttpGet, Route("GetServerInfo")]
        public dynamic GetServerInfo()
        {
            try
            {
                ServerInfo serverInfo = new ServerInfo();
                _logger.LogInformation($"Init Result: {serverInfo.OutStringOBJ()}");
                return new { value_init = serverInfo.OutStringOBJ(), path = serverInfo.CurrentPath };
            }
            catch (Exception ex)
            {
                return new {error = ex.Message};
            }
        }
    }
}
