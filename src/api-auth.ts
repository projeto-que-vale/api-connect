import {ApiToken} from './security/token/api-token';

const acl: any = {};

export class ApiAuth {
    clientId: string;

    constructor(public req: any, public res: any, public apiToken: ApiToken) {
    }

    public get ready(): boolean {
        return this.apiToken.isValid;
    }

    private _accessControlError: any = {};

    get accessControlError(): boolean {
        return Object.keys(this._accessControlError).length > 0;
    }

    get scopes(): Array<string> {
        return []; //this._tokenObj.scope;
    }

    get level(): number {
        return 0; //parseInt(this._tokenObj.level);
    }

    /**
     * Lista de escopos configuradas para o usuário
     */
    get source(): string {
        return 'this._tokenObj.source';
    }

    /**
     * Identificação do usuário logado
     */
    get user(): any {
        return {
            /*_id: this._tokenObj.cid,
            name: this._tokenObj.user*/
        }
    }

    /**
     * Identificação do nível de acesso do usuário
     * Mensagens de erros de campos que o usuário não possue permissão de acesso
     */
    get accessControl(): any {
        const result: any = {
            level: this.level,
            profile: this.apiToken.profile,
            type: this.apiToken.applicationType
        };
        if (this.accessControlError) {
            result.error = this._accessControlError;
        }
        return result;
    }

    /**
     * Identificação da aplicação
     */
    //application(collection: string): any {
    application(): any {
        /*return {
            _id: this._tokenObj.aid,
            name: this._tokenObj.iss,
            source: collection
        }*/
    }

    accessControlInput(input: any, info: any) {
        const result: any = {};
        for (const field in input) {
            if (this.level >= acl[`${info.fieldName}.${field}`]) {
                result[field] = input[field];
            }
        }
        // throw new ApolloError('sdfsdfsdf', '456546nbfd', {opa: 'o serviço não está funcionando', mala: 'falta definir alguma coisa'});
        return input;
    }

    /*hasRole(value): boolean {
        return this._tokenObj.role.indexOf(value) > -1;
    }

    hasScope(value): boolean {
        return this._tokenObj.scope.indexOf(value) > -1;
    }

    accessControlList(value): void {
        this._accessControlError[value.path] = value.level;
    }*/

    /**
     * Converte objetos graphQL em endereços de campo
     *
     * @param path Partde do objeto de configuração de campo graphQL
     */
    async getPath(path: any) {
        function promisse(): Promise<any> {
            return new Promise<any>((resolve) => {
                const listPath: Array<string> = [];
                const createPath: any = (value: any) => {
                    if (value.hasOwnProperty('key')) {
                        //Retira o identificador de resultados
                        //Retira identificadores de posição nas listas (array index)
                        if (value.key !== 'result' && typeof value.key !== 'number') {
                            listPath.unshift(value.key);
                        }
                        if (value.prev) {
                            createPath(value.prev);
                        }
                    }
                };
                createPath(path);
                resolve(listPath.join('.'));
            });
        }

        return await promisse();
    }

    /**
     * Verifica o nível de acesso do usuário, caso seja maior ou igual a 3 (admin/developer/master) realiza valização de escopo,
     * caso contrário realiza validação de campo.
     * Registra os campos que o usuário não possue permissão de acesso na lista de controle.
     *
     *  Usado por MinAccessDirective, verifica a permissão de acesso para cada campo @minAccess
     *
     * @param info Objeto de configuração de campo graphQL
     */

    //TODO:: Implementar controle de acesso
    //@ts-ignore
    async accessLevel(info: any): Promise<boolean> {
        return true;

        /*const path: string = await this.getPath(info.path);

        //TODO:: Implementar liberação de controle de acesso para níveis acima de 3
        //TODO:: Verificar erro lógico que não informa qual o nível de acesso que está sendo solicitado
        if (this.level >= 999) {
            const pos: number = path.indexOf('.');
            const scope: string = path.substr(0, pos);
            return this.hasScope(scope);
        } else {
            const level = acl[path];
            if (level) {
                if (!level || this.level < level) {
                    this.accessControlList({path, level});
                    return false;
                }
            } else {
                this.accessControlList({path, level: 'NO_ACL'});
                return false;
            }
        }
        return true;*/
    }
}
