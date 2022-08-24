function searchInstance{
    Param($instance,$keyword)
    return @{
        column1 = "Search $instance result"
        column2 = "$keyword"
    }
}