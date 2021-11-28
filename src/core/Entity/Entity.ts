// import { DatasourceBase } from '../Datasource/DatasourceBase'
// import Shell from '../Shell/Shell'

type CheckConfigurationResult = {
    success: boolean;
    failureMessage: string;
  };
export type EntityType = "Unknown" | "Shell" | "Datasource" | "Plugin";
  
export abstract class Entity {
static entityName = ""; // cannot use name, as it is reserved
static multiInstances = false;
static maxInstances = 0;
static entityType: EntityType = "Unknown";

_config = {};
get config() {
    return this._config;
}
set config(config) {
    this._config = config;
}

constructor(config = {}) {
    this._config = config;
    const MyChildEntityClass = <typeof Entity>this.constructor;
    if (MyChildEntityClass.entityName === "") {
    throw new Error("Entity cannot have empty name");
    }
    if (MyChildEntityClass.entityType === "Unknown") {
    throw new Error("Entity type cannot stay 'Unknown'");
    }
}

static getConfigurationSchema() {
    return {};
}

async checkConfiguration(): Promise<CheckConfigurationResult> {
    return {
    success: true,
    failureMessage: ""
    };
}

isDatasource() {
    return this instanceof Datasource;
}
isShell() {
    return this instanceof Shell;
}

}


export class Shell extends Entity {
static entityType: EntityType = "Shell";
}

export class Datasource extends Entity {
static entityType: EntityType = "Datasource";
}

export class Plugin extends Entity {
static entityType: EntityType = "Plugin";
}
