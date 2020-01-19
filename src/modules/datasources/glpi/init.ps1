class GLPISearcher
{
    hidden [String] $ClassFilePath
    hidden [Array] $DummyData

    # Constructor
    GLPISearcher(){
        $this.ClassFilePath = $PSScriptRoot
        
    }

    [Array] Search([String] $Keyword){
        [Array] $res = @()
        
        [System.Array]$hosts = @()
        
        #Field obtained from Get-GlpiToolsListSearchOptions Computer | ? {$_.Field -like "*name*"}
        $tmp = Search-GlpiToolsItems -SearchFor Computer -SearchType contains -SearchField 1 -SearchValue "${keyword}"
        if ($tmp -ne $null) { $hosts += $tmp }
        
        #Search for User Owner Field obtained from Get-GlpiToolsListSearchOptions Computer | ? {$_.Name -like "*util*"}
        $tmp = Search-GlpiToolsItems -SearchFor Computer -SearchType contains -SearchField 70 -SearchValue "${keyword}"
        if ($tmp -ne $null) { $hosts += $tmp }
        
        #Search for Screen user (obtained from Get-GlpiToolsListSearchOptions Monitor | ? {$_.Name -like "*util*"} )
        #Search-GlpiToolsItems -SearchFor Monitor -SearchType contains -SearchField 70 -SearchValue "${keyword}"
        
        $res = $hosts
        # $res = $hosts

        # $this.DummyData | % {
        #     if ($_.username -match $Keyword){
        #         $res += , $_
        #     } elseif ($_.hostname -match $Keyword){
        #         $res += , $_
        #     }
        # }
        return $res
    }

}
$glpiSearcher = [GLPISearcher]::new()

