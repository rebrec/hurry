export type Platforms = Array<'win32' | 'linux'>
export type InitCommands = Array<string>
export interface Column {columnName: string, property: string, variableName?: string};
export interface SearchResults { success: boolean, data: Array<any>};
export interface DatasourceDefinition {
    name: string,
    caption: string,
    shellName: string,
    mainColumnProperty: string,
    pingableProperty?: string,
    columns: Array<Column>,
    initCommands: InitCommands,
    platforms: Platforms
}

export interface LegacyDatasourceDefinition extends DatasourceDefinition {
    shell?: string,
    searchFunc: LegacyDatasourceDefinitionJS | LegacyDatasourceDefinitionShell
}


export interface LegacyDatasourceDefinitionShell extends DatasourceDefinition {
    searchFunc: (keyword: string) => string
}
export interface LegacyDatasourceDefinitionJS extends DatasourceDefinition {
    searchFunc: (keyword: string) => Promise<SearchResults>
}

export interface TemplateContext {
    disabled?: boolean | undefined;
    instanceId: number,
    pluginDir: string,
}
export type GenericConfig = { [key: string]: any }

export interface Config extends GenericConfig { 
    disabled: boolean | undefined;
}

export interface TemplateContextElement { [index: string]: string }

