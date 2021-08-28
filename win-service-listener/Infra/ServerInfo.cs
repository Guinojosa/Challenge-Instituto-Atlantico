using System;
using System.Management.Automation;
using Microsoft.Extensions.Logging;
using win_service_listener.Service;

namespace win_service_listener.Infra
{
    public class ServerInfo
    {
        #region Properties Init
        public string Hostname { get; set; }
        public string AddresIp { get; set; }
        public string FirewallStatus { get; set; }
        public string WindowsVersion { get; set; }
        public string AntiVirus { get; set; }
        public string DotnetVersion { get; set; }
        public string HdState { get; set; }
        public string CurrentPath { get; set; }
        #endregion

        #region builders
        public ServerInfo() => SetValuesInit();

        protected void SetValuesInit(){
            this.Hostname = PowerShellService.ExecuteCommandbyPath("","hostname");
            this.AddresIp = PowerShellService.ExecuteCommandbyPath("","ipconfig | findstr /i \"ipv4\"");
            this.FirewallStatus = PowerShellService.ExecuteCommandbyPath("","netsh advfirewall show currentprofile state");
            this.WindowsVersion = PowerShellService.ExecuteCommandbyPath("","(Get-ItemProperty -Path c:\\windows\\system32\\hal.dll).VersionInfo.FileVersion");
            this.AntiVirus = PowerShellService.ExecuteCommandbyPath("","Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct | Select displayName ");
            this.DotnetVersion = PowerShellService.ExecuteCommandbyPath("","dotnet --version");
            this.HdState = PowerShellService.ExecuteCommandbyPath("","Get-PSDrive | Select-Object Name, @{ E={\"$([math]::round($_.Used/1GB,2))\"}; L='Used' }, @{ E={\"$([math]::round($_.Free/1GB,2))\"}; L='Free' } | where {($_.Used -notlike 0)}");
            this.CurrentPath = PowerShellService.ExecuteCommandbyPath("","Get-Location");
        }

        public string OutStringOBJ() {
            string result = string.Empty;
            result += $"Machine Name: {this.Hostname}\n";
            result += $"Address IPV4: \r\n {this.AddresIp}\n";
            result += $"Firewall Status: \r\n {this.FirewallStatus}";
            result += $"Version Windows: {this.WindowsVersion}\n";
            result += $"AntiVirus Installed: \r\n {this.AntiVirus}";
            result += $"Dotnet Version: {this.DotnetVersion}";
            result += $"Size of HDD's (GB): \r\n{this.HdState}";            
            return result;
        }
        #endregion
    }
}