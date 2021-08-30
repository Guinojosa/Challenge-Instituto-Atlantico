using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using WinServiceListener.API.Controllers;
using WinServiceListener.API.Infra;

namespace WinServiceLisstener.Test
{
    [TestClass]
    public class TestAPI
    {
        [TestMethod]
        public void TestServerInfo()
        {
            ILogger<CommandsController> logger = new Logger<CommandsController>(new NullLoggerFactory());
            CommandsController commandController = new CommandsController(logger);
            ObjReturn serverInfo = commandController.GetServerInfo();
            Assert.IsTrue(!String.IsNullOrEmpty(serverInfo.ServerInfo));
        }

        [TestMethod]
        public void TestCommandByServerPath()
        {
            ILogger<CommandsController> logger = new Logger<CommandsController>(new NullLoggerFactory());
            CommandsController commandController = new CommandsController(logger);
            ObjReturn serverInfo = commandController.GetServerInfo();
            ObjReturn commandByPath = commandController.GetCommandByPath(serverInfo.SeverPath, "CommandNotValid");
            Assert.IsTrue(!String.IsNullOrEmpty(commandByPath.Error));
        }

    }
}
