import { Entity, EntityType, Datasource, Shell } from "../Entity/Entity";

type EntityTypesSettings = { [key in EntityType]: Array<any> }

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
    _schema = {
        entities: {
            shells: [],
            datasources: [],
            plugins: []
        }
    };

    _getEntityInstanceNoEntityClass(EntityClass: typeof Entity){
        // Check in global configuration if this entity already exist

        // else
        return 1;
    }

    registerEntityType(EntityClass: typeof Entity){
        let maxInstances=1;
        const instancesNo=this._getEntityInstanceNo(EntityClass);
        if (EntityClass.multiInstances === true){
            maxInstances = (EntityClass.maxInstances === 0) ? -1 : EntityClass.maxInstances;
        }

        this.entityTypes[EntityClass.entityType].push({
            name: EntityClass.entityName,
            maxInstances: maxInstances,
            instancesNo: instancesNo
        });
    }

    registerEntitySchema(entityType : EntityType, name: string, schema={}){
        this._schema.entities[entityType] = {
            name: name,
            schema: schema
        }
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