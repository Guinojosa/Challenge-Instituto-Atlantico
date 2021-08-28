
using System;
using System.Management.Automation;
using Microsoft.Extensions.Logging;

namespace win_service_listener.Service
{
    public class PowerShellService
    {
        public static string ExecuteCommandbyPath(string path, string command)
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
                else if (results.Count == 0) throw new Exception("");
                else result = results[0].ToString();
            }
            return result;
        }

    }
}