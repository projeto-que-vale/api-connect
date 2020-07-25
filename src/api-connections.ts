import {ApiConnection} from './api-connection';
import {ApiToken} from './security/token/api-token';

const {AuthenticationError} = require('apollo-server');

const _interval: any = () => {
    ApiConnections.clear();
};


export class ApiConnections {

    // Configura a classe para bloquar a inicialiação através do construtor new
    constructor() {
        if (ApiConnections._instance) {
            throw new Error('Error: Instantiation failed: Use ApiConnections.instance().');
        }
        ApiConnections._instance = this;
    }

    public static get instance(): ApiConnections {
        return this._instance;
    }

    /**
     *
     */
    public static get size(): number {
        return Object.keys(this._instance._listStack).length;
    }
    // Tempo limite permitido para uma conexão permanecer na lista
    public static MAX_LIMIT_TIME: number = 5000;

    // Instância da singleton da classe
    private static _instance: ApiConnections = new ApiConnections();
    // Lista de conexões do client rest
    private _listStack: any = {};
    private _intervalControler: any;

    /**
     * Cria e adiciona uma nova conexão na lista de gerenciamento de conexões
     *
     * @param req Request Parâmetros recebidos do client
     * @param res Result Parâmetros de configuração do que será retornado para o client
     */
    public static async connection(req: any, res: any) {
        if (!req || !res) {
            return new ApiConnection(req, res, new ApiToken(''));
        }

        if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
            if (!this._instance._intervalControler) {
                this._instance._intervalControler = setInterval(_interval, ApiConnections.MAX_LIMIT_TIME);
            }
            let connection: ApiConnection;
            const apiToken: ApiToken = ApiToken.authorization(req.headers.authorization);
            if (apiToken.isValid) {
                connection = this._instance._listStack[apiToken.clientId];
                if (!connection) {
                    connection = new ApiConnection(req, res, apiToken);
                    this._instance._listStack[apiToken.clientId] = connection;
                }
            } else {
                connection = new ApiConnection(req, res, apiToken);
                connection.error.add('000001', 'Token de acesso inválido (invalid_module)');
            }
            connection.reset(req, res);
            return connection;
        } else {
            throw new AuthenticationError('Access token required to perform authenticated');
        }
    }

    /**
     * Remove a conexão solicitada
     *
     * @param id Identificador da conexão
     */
    public static remove(id: string): void {
        this._instance._listStack[id] = null;
        delete (this._instance._listStack[id]);
    }

    /**
     * Remove elementos obsoletos da lista fornecida
     */
    public static clear(): void {
        console.log('ApiConnections.size', ApiConnections.size);
        //Verifica se tem algum elemento na lista de elementos
        if (ApiConnections.size) {
            //Processa a lista completa de aplicações em busca de aplicações onde o tempo de vida expirou
            for (const item in this._instance._listStack) {
                //Verifica se o objeto existe na lista
                if (this._instance._listStack.hasOwnProperty(item)) {
                    //Verifica se o tempo de vida do elemento é maior do que o limite permitido
                    if ((this._instance._listStack[item]).lifeTime > ApiConnections.MAX_LIMIT_TIME) {
                        (this._instance._listStack[item]).close();
                        delete (this._instance._listStack[item]);
                    }
                }
            }
        }

        if (ApiConnections.size <= 0) {
            clearInterval(this._instance._intervalControler);
            this._instance._intervalControler = null;
        }

        console.log('Total connection:', ApiConnections.size);
    }
}
