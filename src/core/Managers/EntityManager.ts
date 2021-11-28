import { Entity, EntityType, Datasource, Shell } from "../Entity/Entity";

type EntityTypesPluralNames = "shells" | "datasources" | "plugins"
type EntityTypesSettings = { [key in EntityTypesPluralNames]: Array<any> }

const entityTypesPluralNameMapping: {[key in EntityType]: EntityTypesPluralNames} = {
    "Shell": "shells",
    "Datasource": "datasources",
    "Plugin": "plugins"
}

type EntitySchemaDefinition = { name: string, schema: Object};
type EntityGlobalSchemaDefinition = {
    entities: {
        shells: Array<EntitySchemaDefinition>,
        datasources: Array<EntitySchemaDefinition>,
        plugins: Array<EntitySchemaDefinition>,
    }
}

class ConfigurationManager{
    _config = {
        entityInstances: {
            
        }

    }

    entityTypes: EntityTypesSettings = {
        shells: [],
        datasources: [],
        plugins: []
    }
    _schema: EntityGlobalSchemaDefinition = {
        entities: {
            shells: [],
            datasources: [],
            plugins: []
        }
    };

    _getEntityMaxAllowedInstanceValue(EntityClass: typeof Entity){
        // Check in global configuration if this entity already exist
        
        // else
        return 1;
    }

    _getPluralEntityName(EntityClass: typeof Entity){
        return entityTypesPluralNameMapping[EntityClass.entityType];
    }

    registerEntityType(EntityClass: typeof Entity){
        let maxInstances=1;
        const instancesNo=this._getEntityMaxAllowedInstanceValue(EntityClass);
        if (EntityClass.multiInstances === true){
            maxInstances = (EntityClass.maxInstances === 0) ? -1 : EntityClass.maxInstances;
        }
        
        this.entityTypes[this._getPluralEntityName(EntityClass)].push({
            name: EntityClass.entityName,
            maxInstances: maxInstances,
            instancesNo: instancesNo
        });
        this._registerEntitySchema(EntityClass)
    }

    _registerEntitySchema(EntityClass: typeof Entity){
        const schema = EntityClass.getConfigurationSchema();
        const entitySchemaDefinition: EntitySchemaDefinition = {
            name: name,
            schema: schema
        };
        this._schema.entities[this._getPluralEntityName(EntityClass)].push(entitySchemaDefinition);
    }

}

export default class EntityManager<T extends typeof Entity>{
    entities: Array<T>=[];
    _config = {};
    _configurationManager: ConfigurationManager

    constructor(configurationManager: ConfigurationManager, config={}){
        this._config = config;
        this._configurationManager = configurationManager;
    }

    addEntity(EntityClass: T){
        this.entities.push(EntityClass);
        const { name, multiInstances, maxInstances, entityType } = EntityClass
        const schema = EntityClass.getConfigurationSchema()

        configurationManager.registerSetting

    }


}