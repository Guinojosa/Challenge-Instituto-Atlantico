using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.EventLog;
using NLog.Web;

namespace WinServiceListener.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
      {
          logging.ClearProviders();
          logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
      })
      .UseNLog()
      .ConfigureWebHostDefaults(webBuilder =>
      {
          webBuilder.UseStartup<Startup>();
      })
      .ConfigureWebHost(config =>
      {
          config.UseUrls("http://*:5050");
      }).UseWindowsService();
    }
}
