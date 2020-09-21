
class TestSearcher
{
    hidden [String] $ClassFilePath
    hidden [Array] $DummyData

    # Constructor
    TestSearcher(){
        $this.ClassFilePath = $PSScriptRoot

        $DataFilePath = Join-Path -Path "$($this.ClassFilePath)" -ChildPath "data.json"
        $this.data = Get-Content $DataFilePath | ConvertFrom-JSON
    }

    [Array] Search([String] $Keyword){
        [Array] $res = @()
        $this.data | % {
            if ($_.username -match $Keyword){
                $res += , $_
            } elseif ($_.hostname -match $Keyword){
                $res += , $_
            }
        }
        return $res
    }



}
$test = [TestSearcher]::new()

