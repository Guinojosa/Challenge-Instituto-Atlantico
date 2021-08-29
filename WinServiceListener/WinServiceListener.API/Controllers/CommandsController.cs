using System;
using System.Collections.Generic;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WinServiceListener.API.Infra;
using WinServiceListener.API.Service;

namespace WinServiceListener.API.Controllers
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
        public ObjReturn GetCommandByPath(string path, string command)
        {
            try
            {
                string psresult = PowerShellService.ExecuteCommandbyPath(path, command);
                string messagelog = $"\nCommand: {command} \n Result: {psresult}";
                _logger.LogInformation(message: messagelog);
                return new ObjReturn { result = psresult };
            }
            catch (Exception ex)
            {
                return new ObjReturn { error = ex.Message};
            }
        }

        [HttpGet, Route("GetServerInfo")]
        public ObjReturn GetServerInfo()
        {
            try
            {
                ServerInfo serverInfo = new ServerInfo();
                _logger.LogInformation($"Init Result: {serverInfo.OutStringOBJ()}");
                return new ObjReturn { serverInfo = serverInfo.OutStringOBJ(), severPath = serverInfo.CurrentPath };
            }
            catch (Exception ex)
            {
                return new ObjReturn { error = ex.Message};
            }
        }
    }
}
