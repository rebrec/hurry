# Inspired from https://www.technologytoolbox.com/blog/jjameson/archive/2013/05/07/powershell-scripts-for-managing-the-hosts-file.aspx

$File    = '\\srv-fic04\4221_informatique\12- Administration Systemes Reseaux\Outils\CSharp\GlpiSearch\GlpiSearch\Addons\hosts_v2.txt'


function CreateHostsEntryObject(
    [string] $ipAddress,
    [string[]] $hostnames,
    <# [string] #> $comment) #HACK: never $null if type is specified
{
    $hostsEntry = New-Object PSObject
    $hostsEntry | Add-Member NoteProperty -Name "IpAddress" `
        -Value $ipAddress

    [System.Collections.ArrayList] $hostnamesList =
        New-Object System.Collections.ArrayList

    $hostsEntry | Add-Member NoteProperty -Name "Hostnames" `
        -Value $hostnamesList

    If ($hostnames -ne $null)
    {
        $hostnames | foreach {
            $hostsEntry.Hostnames.Add($_) | Out-Null
        }
    }

    $hostsEntry | Add-Member NoteProperty -Name "Comment" -Value $comment

    return $hostsEntry
}

function ParseHostsEntry(
    [string] $line)
{
    $hostsEntry = CreateHostsEntryObject

    Write-Debug "Parsing hosts entry: $line"

    If ($line.Contains("#") -eq $true)
    {
        If ($line -eq "#")
        {
            $hostsEntry.Comment = [string]::Empty
        }
        Else
        {
            $hostsEntry.Comment = $line.Substring($line.IndexOf("#") + 1)
        }

        $line = $line.Substring(0, $line.IndexOf("#"))
    }

    $line = $line.Trim()

    If ($line.Length -gt 0)
    {
        $hostsEntry.IpAddress = ($line -Split "\s+")[0]

        Write-Debug "Parsed address: $($hostsEntry.IpAddress)"

        [string[]] $parsedHostnames = $line.Substring(
            $hostsEntry.IpAddress.Length + 1).Trim() -Split "\s+"

        Write-Debug ("Parsed hostnames ($($parsedHostnames.Length)):" `
            + " $parsedHostnames")

        $parsedHostnames | foreach {
            $hostsEntry.Hostnames.Add($_) | Out-Null
        }
    }

    return $hostsEntry
}

function ParseHostsFile
{   
    param([string] $hostsFile)
    $hostsEntries = New-Object System.Collections.ArrayList

#        [string] $hostsFile = $env:WINDIR + "\System32\drivers\etc\hosts"
        

    If ((Test-Path $hostsFile) -eq $false)
    {
        Write-Verbose "Hosts file does not exist."
    }
    Else
    {
        [string[]] $hostsContent = Get-Content $hostsFile

        $hostsContent | foreach {
            $hostsEntry = ParseHostsEntry $_

            $hostsEntries.Add($hostsEntry) | Out-Null
        }
    }

    # HACK: Return an array (containing the ArrayList) to avoid issue with
    # PowerShell returning $null (when hosts file does not exist)
    return ,$hostsEntries
}

function Get-HostListFromHostFile{
    param(
     $hostsFile = $env:WINDIR + "\System32\drivers\etc\hosts"
    )
   [Collections.ArrayList] $hostsEntries = ParseHostsFile -hostsFile $hostsFile
    $hostsEntries | foreach {
        $hostsEntry = $_

        $hostsEntry.Hostnames | foreach {
            $properties = @{
                hostname = $_
                ipaddress = $hostsEntry.IpAddress
            }

            New-Object PSObject -Property $properties
        }
    }

}

#################

class HostsFileSearcher
{
    hidden [String] $ClassFilePath
    hidden [Array] $Data

    # Constructor
    HostsFileSearcher($hostsFile){
        $this.ClassFilePath = $PSScriptRoot
        $this.Data = Get-HostListFromHostFile $hostsFile
        Write-Host "Initialized Host file searcher with $($this.Data.Length) entries from file $($hostsFile)"

    }

    [Array] Search([String] $Keyword){
        [Array] $res = @()
        $this.Data | % {
            if ($_.ipaddress -match $Keyword){
                $res += , $_
            } elseif ($_.hostname -match $Keyword){
                $res += , $_
            }
        }
        return $res
    }



}
$hostsFileSearcher = [HostsFileSearcher]::new($File);
