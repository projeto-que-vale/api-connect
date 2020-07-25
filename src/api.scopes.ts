import {ApiUtil} from './api-util';


export class ApiScopes {
    private static _instance: ApiScopes = new ApiScopes();
    private _scopes: Array<string> = [];

    constructor() {
        if (ApiScopes._instance) {
            throw new Error('Error: Instantiation failed: Use ApiScopes.instance() static.');
        }
        ApiScopes._instance = this;
    }

    /**
     * Verifica se um scopo existe na lista
     */
    public static exists(value: string): boolean {
        let result: boolean = false;

        for (const i in this._instance._scopes) {
            if (this._instance._scopes[i] === value) {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     * Verifica se um scopo existe na lista
     */
    public static get values(): Array<string> {
        return this._instance._scopes;
    }

    public static instance(): ApiScopes {
        return this._instance;
    }

    public static register(scope: string): void {
        this._instance._scopes.push(ApiUtil.camelToSnakeCase(scope).replace('_resolvers', ''));
        this._instance._scopes = Array.from(new Set(this._instance._scopes));
        this._instance._scopes = this._instance._scopes.sort();
    }
}
