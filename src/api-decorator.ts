interface ModulesInterface {
    imports?: Array<any>;
    schemas?: Array<any>;
    resolvers?: Array<any>;
}


interface ApiGraphInterface {
    imports?: Array<any>;
    definitions?: any;
    resolvers?: any;
}


export function ApiModule(modules: ModulesInterface) {
    return (constructor: any) => {
        constructor.prototype.modules = modules;
        constructor.prototype.isModule = true;
    }
}

/*export function ApiAction() {
    return function (constructor: Function) {
        constructor.prototype.isAction = true;
    }
}*/

export function ApiGraph(modules: ApiGraphInterface) {
    return (constructor: any) => {
        constructor.prototype.modules = modules;
        constructor.prototype.isApiGraph = true;
    }
}
