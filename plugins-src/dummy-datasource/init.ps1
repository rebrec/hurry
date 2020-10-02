
class DummySearcher
{
    hidden [String] $ClassFilePath
    hidden [Array] $DummyData

    # Constructor
    DummySearcher(){
        $this.ClassFilePath = $PSScriptRoot

        $DataFilePath = Join-Path -Path "$($this.ClassFilePath)" -ChildPath "data.json"
        $this.DummyData = Get-Content $DataFilePath | ConvertFrom-JSON
    }

    [Array] Search([String] $Keyword){
        [Array] $res = @()
        $this.DummyData | % {
            if ($_.username -match $Keyword){
                $res += , $_
            } elseif ($_.hostname -match $Keyword){
                $res += , $_
            }
        }
        return $res
    }



}
$dummy = [DummySearcher]::new()

