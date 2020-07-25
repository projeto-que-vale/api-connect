import {ApiModuleManager} from './api.module.manager';
import {ApiServer} from './api-server';


export class ApiConnect {
    /**
     * Inicializa as configurações da aplicação
     */
    // @ts-ignore
    public static async bootstrap(module: any): Promise<ApiServer> {
        // @ts-ignore
        return new Promise<ApiServer>((resolve) => {
            const item: { modules: any; } = new module();

            this._mergeSchemas(item.modules).then(() => {
                const apiServer: ApiServer = new ApiServer();
                resolve(apiServer);
            });
        });
    }

    /**
     * Verifica a validade da versão do mocroserviço solicitado
     *
     * @param req
     * @param version
     */
    public static version(req: any, version: string): boolean {
        return req.params.version === version;
    }

    /**
     * Processa a lista de módulos que precisam ser importados
     * @param modules
     * @private
     */

    private static async _mergeSchemas(modules: any) {
        function promisse(): Promise<boolean> {
            const processResolvers = (el: any) => {
                const moduleName: string = el.constructor.name;
                const resolvers: Array<any> = el.modules.resolvers;
                resolvers.forEach((item) => {
                    if (item && item.constructor.name === 'Function') {
                        const el: any = new item();
                        if (el.isApiGraph) {
                            const hasConflict: boolean = ApiModuleManager.registerResolvers(moduleName, el.constructor.name, el.modules.resolvers);
                            if (!hasConflict) {
                                const temp: { modules: any; } = new item();
                                ApiConnect._mergeSchemas(temp.modules);
                            }
                        }
                    }
                });
            };

            const processSchemas = (el: any) => {
                const moduleName: string = el.constructor.name;
                const schemas: Array<any> = el.modules.schemas;
                schemas.forEach((item) => {
                    if (item && item.constructor.name === 'Function') {
                        const el: any = new item();
                        if (el.isApiGraph) {
                            const hasConflict: boolean = ApiModuleManager.registerDefinitions(moduleName, el.constructor.name, el.modules);
                            if (!hasConflict) {
                                const temp: { modules: any; } = new item();
                                ApiConnect._mergeSchemas(temp.modules);
                            }
                        }
                    }
                });
            };

            // @ts-ignore
            return new Promise<boolean>((resolve, reject) => {
                //Verifica se tem mais imports para processar
                if (modules.hasOwnProperty('imports')) {
                    modules.imports.forEach((item: any) => {
                        if (item && item.constructor.name === 'Function') {
                            const el: any = new item();
                            if (el.isModule) {
                                if (el.modules.hasOwnProperty('schemas')) {
                                    processSchemas(el);
                                }
                                if (el.modules.hasOwnProperty('resolvers')) {
                                    processResolvers(el);
                                }
                                if (el.modules.hasOwnProperty('imports')) {
                                    ApiConnect._mergeSchemas(el.modules);
                                }
                            }
                            //Verifica se é do tipo componente
                            else {
                                console.error('ERRO IMPORT MODULE', `O componente '${el.constructor.name}' esta configurado em import mas nao e do tipo modulo.`);
                            }
                        }
                    });
                }
                resolve(true);
            });
        }

        return promisse();
    }
}
