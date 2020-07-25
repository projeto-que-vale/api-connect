import {ApiAcmManager} from './security/acm/api-acm-manager';


export class ApiModuleManager {
    private static _instance: ApiModuleManager = new ApiModuleManager();
    private _mapDefinitions: any = {};
    private _mapQuery: any = {};
    private _mapMutation: any = {};
    private _mapSubscription: any = {};
    private _mapQueryCheck: any = {};
    private _mapMutationCheck: any = {};
    private _mapSubscriptionCheck: any = {};
    private _mapResolvers: any = {};
    private _mapResolversQuery: any = {};
    private _mapResolversMutation: any = {};
    private _mapResolversSubscription: any = {};
    private _listModules: Array<string> = [];
    private _listResources: any = {};

    constructor() {
        if (ApiModuleManager._instance) {
            throw new Error('Error: Instantiation failed: Use ApiModuleManager.instance() static.');
        }
        ApiModuleManager._instance = this;
    }

    /**
     * Retorna as definições de definitions
     */
    public static get typeDefs(): any {
        const result: any = {
            kind: 'Document',
            definitions: []
        };

        for (const i in this._instance._mapDefinitions) {
            result.definitions.push(this._instance._mapDefinitions[i].definitions);
        }
        result.definitions.push(this.query);
        result.definitions.push(this.mutation);
        result.definitions.push(this.subscription);

        ApiAcmManager.registerPolicies(this.resources);

        return [result];
    }

    /**
     * Retorna as definições de query
     */
    public static get query() {
        const result: any = {
            kind: 'ObjectTypeDefinition',
            description: {kind: 'StringValue', value: 'Configurações de Query', block: true},
            name: {kind: 'Name', value: 'Query'},
            interfaces: [],
            directives: [],
            fields: []
        };
        const mapQuery: any = this._instance._mapQuery;
        for (const i in mapQuery) {
            if (this._instance._mapQueryCheck[i]) {
                result.fields.push(mapQuery[i]['definitions']);
            } else {
                console.error(`ERROR SCHEMA QUERY: Configuracao invalida. O endpoint '${i}' esta sendo definido em ${mapQuery[i]['moduleName']}::${mapQuery[i]['schemaType']}::Query{${i}(?)}, mas nao esta definido em resolvers Query{...}.`);
            }
        }
        return result;
    }

    /**
     * Retorna as definições de mutation
     */
    public static get mutation(): any {
        const result: any = {
            kind: 'ObjectTypeDefinition',
            description: {kind: 'StringValue', value: 'Configurações de Mutation', block: true},
            name: {kind: 'Name', value: 'Mutation'},
            interfaces: [],
            directives: [],
            fields: []
        };
        const mapMutation: any = this._instance._mapMutation;
        for (const i in mapMutation) {
            if (this._instance._mapMutationCheck[i]) {
                result.fields.push(mapMutation[i]['definitions']);
            } else {
                console.error(`ERROR SCHEMA MUTATION: Configuracao invalida. O endpoint '${i}' esta sendo definido em ${mapMutation[i]['moduleName']}::${mapMutation[i]['schemaType']}::Query{${i}(?)}, mas nao esta definido em resolvers Query{...}.`);
            }
        }
        return result;
    }

    /**
     * Retorna as definições de subscription
     */
    public static get subscription(): any {
        const result: any = {
            kind: 'ObjectTypeDefinition',
            description: {kind: 'StringValue', value: 'Configurações de Subscription', block: true},
            name: {kind: 'Name', value: 'Subscription'},
            interfaces: [],
            directives: [],
            fields: []
        };
        const mapSubscription: any = this._instance._mapSubscription;
        for (const i in mapSubscription) {
            if (this._instance._mapSubscriptionCheck[i]) {
                result.fields.push(mapSubscription[i]['definitions']);
            } else {
                console.error(`ERROR SCHEMA SUBSCRIPTION: Configuracao invalida. O endpoint '${i}' esta sendo definido em ${mapSubscription[i]['moduleName']}::${mapSubscription[i]['schemaType']}::Query{${i}(?)}, mas nao esta definido em resolvers Query{...}.`);
            }
        }
        return result;
    }

    /**
     * Retorna as definições de resolvers
     */
    public static get resolvers(): any {
        const result: any = {Query: {}, Mutation: {}, Subscription: {}};
        const mapResolvers: any = this._instance._mapResolvers;
        const mapResolversQuery: any = this._instance._mapResolversQuery;
        const mapResolversMutation: any = this._instance._mapResolversMutation;
        const mapResolversSubscription: any = this._instance._mapResolversSubscription;

        for (const i in mapResolvers) {
            result[i] = mapResolvers[i]['definitions'];
        }

        for (const i in mapResolversQuery) {
            result.Query[i] = mapResolversQuery[i]['definitions'];
        }

        for (const i in mapResolversMutation) {
            result.Mutation[i] = mapResolversMutation[i]['definitions'];
        }

        for (const i in mapResolversSubscription) {
            result.Subscription[i] = mapResolversSubscription[i]['definitions'];
        }
        return result;
    }

    /**
     * Verifica se um scopo existe na lista
     */
    public static get modules(): Array<string> {
        return this._instance._listModules;
    }

    public static get resources(): any {
        const result: any = [];

        for (const name in this._instance._listResources) {
            const listResources: any = this._instance._listResources[name];
            const resources: Array<string> = [];
            const module: any = {
                module: name,
            };
            const qry: any = listResources['qry'];
            const mut: any = listResources['mut'];
            const sub: any = listResources['sub'];

            if (qry) {
                module.qry = qry;
                qry.forEach((item)=>{
                    resources.push('qry:' + item)
                });
            }
            if (mut) {
                module.mut = mut;
                mut.forEach((item)=>{
                    resources.push('mut:' + item)
                });
            }
            if (sub) {
                module.sub = sub;
                sub.forEach((item)=>{
                    resources.push('sub:' + item)
                });
            }

            module.resources = resources;

            result.push(module);
        }
        return result;
    }

    public static registerModule(module: string): void {
        this._instance._listModules.push(module);
        this._instance._listModules = Array.from(new Set(this._instance._listModules));
        this._instance._listModules = this._instance._listModules.sort();
    }

    public static registerResource(type: string, module: string, action: string): void {
        module = module.replace('Module', '');
        this.registerModule(module);

        if (!(this._instance._listResources.hasOwnProperty(module))) {
            this._instance._listResources[module] = {};
        }

        if (!(this._instance._listResources[module].hasOwnProperty(type))) {
            this._instance._listResources[module][type] = [];
        }

        (this._instance._listResources[module][type]).push(action);
    }

    /**
     * Verifica se um scopo existe na lista
     */
    public static exists(value: string): boolean {
        let result: boolean = false;

        for (const i in this._instance._listModules) {
            if (this._instance._listModules[i] === value) {
                result = true;
                break;
            }
        }
        return result;
    }

    public static instance(): ApiModuleManager {
        return this._instance;
    }

    /**
     * Registra lista de definições de resolvers
     * @param moduleName Identificador do módulo
     * @param schemaType Identificador do tipo de schema
     * @param resolvers Definição do resolvers
     */
    public static registerResolvers(moduleName: string, schemaType: string, resolvers: any): boolean {
        let hasConflict: boolean = false;
        for (const itemName in resolvers) {
            const item: any = resolvers[itemName];
            const mapResolvers: any = this._instance._mapResolvers[itemName];

            if (itemName === 'Query') {
                this.registerResolverQuery(moduleName, schemaType, item);
            } else if (itemName === 'Mutation') {
                this.registerResolverMutation(moduleName, schemaType, item);
            } else if (itemName === 'Subscription') {
                this.registerResolverSubscription(moduleName, schemaType, item);
            } else if (this._instance._mapResolvers.hasOwnProperty(itemName) && moduleName !== mapResolvers.moduleName && schemaType !== mapResolvers.schemaType) {
                console.error(`ERROR RESOLVER: Conflito de namespace. O resolver '${itemName}' esta sendo definido em mais de um lugar. ${moduleName}::${schemaType}::resolver ${itemName}{...} --> ${mapResolvers.moduleName}::${mapResolvers.schemaType}::resolver ${itemName}{...}.`);
                hasConflict = true;
            } else {
                this._instance._mapResolvers[itemName] = {
                    moduleName,
                    schemaType,
                    definitions: item
                }
            }
        }
        return hasConflict;
    }

    /**
     * Registra lista de definições de schemas
     * @param moduleName Identificador do módulo
     * @param schemaType Identificador do tipo de schema
     * @param modules Definição do schema
     */
    static registerDefinitions(moduleName: string, schemaType: string, modules: any): boolean {
        let hasConflict: boolean = false;
        const el: any = modules.definitions;
        el.definitions.forEach((item) => {
            const mapSchema: any = this._instance._mapDefinitions[item.name.value];
            if (item.name.value === 'Query') {
                this.registerQuery(moduleName, schemaType, item);
            } else if (item.name.value === 'Mutation') {
                this.registerMutation(moduleName, schemaType, item);
            } else if (item.name.value === 'Subscription') {
                this.registerSubscription(moduleName, schemaType, item);
            } else if (this._instance._mapDefinitions.hasOwnProperty(item.name.value) && moduleName !== mapSchema.moduleName && schemaType !== mapSchema.schemaType) {
                console.error(`ERROR SCHEMA: Conflito de namespace. O tipo '${item.name.value}' esta sendo definido em mais de um lugar. ${moduleName}::${schemaType}::type ${item.name.value}{...} --> ${mapSchema.moduleName}::${mapSchema.schemaType}::type ${item.name.value}{...}.`);
                hasConflict = true;
            } else {
                this._instance._mapDefinitions[item.name.value] = {
                    moduleName,
                    schemaType,
                    definitions: item
                };
            }
        });
        return hasConflict;
    }

    /**
     * Registra lista de definições de query
     * @param moduleName Identificador do módulo
     * @param schemaType Identificador do tipo de schema
     * @param schema Definição de query
     */
    static registerQuery(moduleName: string, schemaType: string, schema: any): void {
        schema.fields.forEach((item) => {
            const mapQuery: any = this._instance._mapQuery[item.name.value];
            if (this._instance._mapQuery.hasOwnProperty(item.name.value) && moduleName !== mapQuery.moduleName && schemaType !== mapQuery.schemaType) {
                console.error(`ERROR SCHEMA QUERY: Conflito de namespace. A query '${item.name.value}' esta sendo definida em mais de um lugar. ${moduleName}::${schemaType}::type Query{${item.name.value}:?} --> ${mapQuery.moduleName}::${mapQuery.schemaType}::type Query{${item.name.value}:?}.`);
            } else {
                this._instance._mapQuery[item.name.value] = {
                    moduleName,
                    schemaType,
                    definitions: item
                }
            }
        });
    }

    static registerResolverQuery(moduleName: string, schemaType: string, resolvers: any): void {

        for (const itemName in resolvers) {
            //Verifica se o resolver está também definido no schema
            if (this._instance._mapQuery.hasOwnProperty(itemName)) {
                const item: any = resolvers[itemName];
                const mapResoverQuery: any = this._instance._mapResolversQuery[itemName];

                if (this._instance._mapResolversQuery.hasOwnProperty(itemName) && moduleName !== mapResoverQuery.moduleName && schemaType !== mapResoverQuery.schemaType) {
                    console.error(`ERROR RESOLVER QUERY: Conflito de namespace. O resolvers Query '${itemName}' esta sendo definida em mais de um lugar. ${moduleName}::${schemaType}::resolvers Query{${itemName}:?} --> ${mapResoverQuery.moduleName}::${mapResoverQuery.schemaType}::resolvers Query{${itemName}:?}.`);
                } else {
                    if (typeof item === 'function') {
                        this.registerResource('qry', moduleName, itemName);
                        this._instance._mapQueryCheck[itemName] = true;
                        this._instance._mapResolversQuery[itemName] = {
                            moduleName,
                            schemaType,
                            definitions: item
                        }
                    } else {
                        console.error(`ERROR RESOLVER QUERY: Implementação de metodo inválida. O resolver Query '${itemName}' precisa de uma implementacao valida. ${moduleName}::${schemaType}::resolvers::Query{${itemName}:error}.`);
                    }
                }
            } else {
                console.error(`ERROR RESOLVER: Configuracao invalida. O metodo '${itemName}' esta sendo definido em ${moduleName}::${schemaType}::Query{${itemName}(?)}, mas nao esta definido em schemas Query{...}.`);
            }

        }
    }

    /**
     * Registra lista de definições de mutation
     * @param moduleName Identificador do módulo
     * @param schemaType Identificador do tipo de schema
     * @param schema Definição de mutation
     */
    static registerMutation(moduleName: string, schemaType: string, schema: any): void {
        schema.fields.forEach((item) => {
            const mapQuery: any = this._instance._mapMutation[item.name.value];
            if (this._instance._mapMutation.hasOwnProperty(item.name.value) && moduleName !== mapQuery.moduleName && schemaType !== mapQuery.schemaType) {
                console.error(`ERROR SCHEMA MUTATION: Conflito de namespace. O resolver Mutation '${item.name.value}' esta sendo definida em mais de um lugar. ${moduleName}::${schemaType}::resolver Mutation{${item.name.value}(?)} --> ${mapQuery.moduleName}::${mapQuery.schemaType}::resolver Mutation{${item.name.value}(?)}.`);
            } else {
                this._instance._mapMutation[item.name.value] = {
                    moduleName,
                    schemaType,
                    definitions: item
                }
            }
        });
    }

    static registerResolverMutation(moduleName: string, schemaType: string, resolvers: any): void {
        for (const itemName in resolvers) {
            const item: any = resolvers[itemName];
            const mapResoverMutation: any = this._instance._mapResolversMutation[itemName];
            if (this._instance._mapResolversMutation.hasOwnProperty(itemName) && moduleName !== mapResoverMutation.moduleName && schemaType !== mapResoverMutation.schemaType) {
                console.error(`ERROR RESOLVER MUTATION: Conflito de namespace. O resolver Mutation '${itemName}' esta sendo definida em mais de um lugar. ${moduleName}::${schemaType}::resolvers::Mutation{${itemName}:?} --> ${mapResoverMutation.moduleName}::${mapResoverMutation.schemaType}::resolvers::Mutation{${itemName}:?}.`);
            } else {
                if (typeof item === 'function') {
                    this.registerResource('mut', moduleName, itemName);
                    this._instance._mapMutationCheck[itemName] = true;
                    this._instance._mapResolversMutation[itemName] = {
                        moduleName,
                        schemaType,
                        definitions: item
                    }
                } else {
                    console.error(`ERROR RESOLVER MUTATION: Implementação de metodo inválida. O resolver Mutation '${itemName}' precisa de uma implementacao valida. ${moduleName}::${schemaType}::resolvers::Mutation{${itemName}:error}.`);
                }
            }
        }
    }

    /**
     * Registra lista de definições de subscription
     * @param moduleName Identificador do módulo
     * @param schemaType Identificador do tipo de schema
     * @param schema Definição de subscription
     */
    static registerSubscription(moduleName: string, schemaType: string, schema: any): void {
        schema.fields.forEach((item) => {
            const mapQuery: any = this._instance._mapSubscription[item.name.value];
            if (this._instance._mapSubscription.hasOwnProperty(item.name.value) && moduleName !== mapQuery.moduleName && schemaType !== mapQuery.schemaType) {
                console.error(`ERROR SCHEMA MUTATION: Conflito de namespace. O resolver Subscription '${item.name.value}' esta sendo definida em mais de um lugar. ${moduleName}::${schemaType}::resolver Subscription{${item.name.value}(?)} --> ${mapQuery.moduleName}::${mapQuery.schemaType}::resolver Subscription{${item.name.value}(?)}.`);
            } else {
                this._instance._mapSubscription[item.name.value] = {
                    moduleName,
                    schemaType,
                    definitions: item
                }
            }
        });
    }

    static registerResolverSubscription(moduleName: string, schemaType: string, resolvers: any): void {
        for (const itemName in resolvers) {
            const item: any = resolvers[itemName];
            const mapResoverSubscription: any = this._instance._mapResolversSubscription[itemName];

            if (this._instance._mapResolversSubscription.hasOwnProperty(itemName) && moduleName !== mapResoverSubscription.moduleName
                    && schemaType !== mapResoverSubscription.schemaType) {
                console.error(`ERROR RESOLVER SUBSCRIPTION: Conflito de namespace. O resolver Subscription '${itemName}' esta sendo definida em mais de um lugar. ${moduleName}::${schemaType}::resolvers::Subscription{${itemName}:?} --> ${mapResoverSubscription.moduleName}::${mapResoverSubscription.schemaType}::resolvers::Subscription{${itemName}:?}.`);
            } else {
                if (item.hasOwnProperty('subscribe') && typeof item.subscribe === 'function') {
                    this.registerResource('sub', moduleName, itemName);
                    this._instance._mapSubscriptionCheck[itemName] = true;
                    this._instance._mapResolversSubscription[itemName] = {
                        moduleName,
                        schemaType,
                        definitions: item
                    }
                } else {
                    console.error(`ERROR RESOLVER SUBSCRIPTION: Implementação de metodo inválida. O resolver Subscription '${itemName}' precisa de uma implementacao valida. ${moduleName}::${schemaType}::resolvers::Subscription{${itemName}:error}.`);
                }
            }
        }
    }
}
