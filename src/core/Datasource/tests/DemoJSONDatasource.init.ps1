class JsonFileSearcher
{
    hidden [String] $ClassFilePath
    hidden [Array] $Data

    # Constructor
    JsonFileSearcher($file){
        $this.ClassFilePath = $PSScriptRoot
        $this.Data = Get-Content  $file | ConvertFrom-Json
        Write-Host "Initialized Host file searcher with $($this.Data.Length) entries from file $($file)"

    }

    [Array] Search([String] $Keyword){
        [Array] $res = @()
        $this.Data | % {
            if ($_.ipaddress -match $Keyword){
                $res += , $_
            } elseif ($_.hostname -match $Keyword){
                $res += , $_
            } elseif ($_.something -match $Keyword){
                $res += , $_
            }
        }
        return $res
    }
}

