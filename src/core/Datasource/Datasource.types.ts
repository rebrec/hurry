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
export interface TemplateContext {
    disabled?: boolean | undefined;
    instanceId: number,
    modulePath: string
}

export interface Config { 
    disabled: boolean | undefined;
}

export interface TemplateContextElement { [index: string]: string }

