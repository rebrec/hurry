import { InitCommands } from '../Datasource/Datasource.types'
import MonitorManager from '../MonitorManager'
export enum ShellOutputType {
    Json = 'json',
    None = 'none'
}

export type ProcessExecutionResult = {
    command: string,
    stdout: string,
    stderr: string
}


export type ShellExecutionResult = {
    success: boolean,
    data?: string | Array<object>,
    errorMessage?: string
    res?: ProcessExecutionResult
  }
  

export interface Shell { // dummy interface for now
    name: string,
    registerInitCommands: (initcommands: InitCommands) => void;
    executeAsync:(command: string, context?: {[key: string]: any}, output?: ShellOutputType) => Promise<any>  // <== ANY May be improved here
} 

export type ShellConfigDefinition = {
    name: string,
    initCommands: Array<string>,
    preDestroyCommands: Array<string>,
}
export type ShellConfigInternal = ShellConfigDefinition & {
    monitorMgr: MonitorManager,
    verboseLogging: boolean,
    logFunction: (severity: string, origin: string, msg: string) => void
}
  
  
export type ShellFeature = {
    name: string,
    shell: string,
    initCommands: Array<string>,
    preDestroyCommands: Array<string>
}