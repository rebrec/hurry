

function Search-Test {
    param(
        $Keyword
    )
    $dataFilePath = Join-Path -Path "$($PSScriptRoot)" -ChildPath "data.json"
    $data = Get-Content $dataFilePath | ConvertFrom-JSON

    [Array] $res = @()
    $data | % {
        if ($_.username -match $Keyword){
            $res += , $_
        } elseif ($_.hostname -match $Keyword){
            $res += , $_
        }
    }
    return $res
}
