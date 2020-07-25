// TODO:: Implementar endereço de banco via váriavel de ambiente
import {ApiMetric} from './api-metric';
import {ApiAuth} from './api-auth';
import {ApiToken} from './security/token/api-token';
import {ApiError} from './api-error';

declare const require;
const now = require('performance-now');


export class ApiConnection {
    public metric: ApiMetric;
    public auth: ApiAuth;
    public error: ApiError = new ApiError();
    public mongoClient: any;
    private _startTime: number = now();

    constructor(public req: any, public res: any, public apiToken: ApiToken) {
        this._config(req, res);
    }

    public get ready(): boolean {
        return !this.error.hasErrors;
    }

    /**
     * Calcula o tempo de vida da conexção
     */
    public get lifeTime(): any {
        return (now() - this._startTime).toFixed(3);
    }

    /**
     *
     * @param action create, read, update, delete
     * @param param
     */
    public isValid(action: string, param: any): boolean {

        if (param.hasOwnProperty('info') && (this.apiToken.profile < param.minProfile)) {
            this.error.add('000008', `unauthorized_client: O aplicativo client não tem permissão para realizar interações com o tipo '${action}', necessário um perfil de usuário com mais privilégios de acesso 'token.´prf:${this.apiToken.profile}'`, param.info.fieldName);
        }

        if (param.hasOwnProperty('info') && (this.apiToken.profile === 0)) {
            this.error.add('000006', `unauthorized_client: O aplicativo client não tem definição de perfil de usuário 'token.prf' definida`, param.info.fieldName);
        }

        if (param.hasOwnProperty('info') && (this.apiToken.profile <= 3 && !this.apiToken.hasScope(action + ':' + param.info.fieldName))) {
            this.error.add('000005', `invalid_scope: O aplicativo client não tem definição de scope 'token.scope[${action}:${param.info.fieldName}]' definida para o perfil de usuário '${this.apiToken.profile}'`, param.info.fieldName);
        }

        //if (param.applicationType !== this.apiToken.applicationType) {
            //this.error.add('000007', `unauthorized_client: O aplicativo client não tem permissão de realizar interações com o tipo
        // '${action}' com um token do tipo 'token.sub:${this.apiToken.profile}'`, param.info.fieldName);
        //}
        return this.ready;
    }

    public async cookie(name: string, value: any, options: any) {
        console.log('COOOKIEEE');
        const _res: any = this.res;

        function promisse(): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                const result: any = _res.cookie(name, value, options);
                resolve(result);
            });
        }

        promisse();
        console.log('COOOKIEEEXXXXXXXXXXX');
    }

    reset(req: any, res: any) {
        this.req = req;
        this.res = res;
        this._startTime = now();
        this.metric = new ApiMetric();
        this.error = new ApiError();
    }

    public close() {
        console.log('CONNECTION CLOSE');
        if (this.mongoClient) {
            console.log('CLOSE DB');
            this.mongoClient.close();
        }
    }

    private async _config(req, res) {
        this.auth = new ApiAuth(req, res, this.apiToken);
        this.metric = new ApiMetric();
    }
}
