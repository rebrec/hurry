interface DatasourceBase{
    _nativeSearch?(kw: string): string;
    _getShellSearchString?(kw: string): string;
}

abstract class DatasourceBase {
    private _instanceId: number
    constructor(){
        // I comment the next line I am getting my hest test works. 
        if (!(this instanceof DatasourceShell) && !(this instanceof DatasourceJS)) throw new Error("Datasource must be derived either from DatasourceShell or DatasourceJS classes");
        (this.constructor as any).counter = ((this.constructor.hasOwnProperty('counter') && (this.constructor as any).counter) || 0) + 1;
        this._instanceId = (this.constructor as any).counter;
    }
}

abstract class DatasourceShell extends DatasourceBase{
    abstract _getShellSearchString(keyword: string): string
}

abstract class DatasourceJS extends DatasourceBase{
    abstract _nativeSearch(keyword: string): string;
}

class DummyDatasourceShell extends DatasourceShell { _getShellSearchString(kw: string){return "Not implemented"} }

test("demo test", () =>{
    expect(() => new DummyDatasourceShell()).not.toThrowError();            
});

