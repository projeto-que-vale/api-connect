import {ApiOptions} from './api-options';
import {ApiDocument} from './api-document';
import {ApiAdapterMongodb} from './adapter/mongodb/api-adapter-mongodb';
import {ApiConnection} from './api-connection';
import {MongoClient} from 'mongodb';
import {ApiTokenApplicationType, ApiTokenAuthContextType, ApiTokenProfileType, ApiTokenType} from './security/token/api-token';
import {ApiFields} from './api-fields';
import {ApiQuery} from './api-query';
import {ApiDocumentUpdate} from './api-document-update';
import {ApiDocumentDelete} from './api-document-delete';


export interface MongoParamsCreateInterface {
    database: string | undefined;
    apiDocument: ApiDocument;
    connection: ApiConnection;
    info: any;
    applicationType: ApiTokenApplicationType,
    tokenType: ApiTokenType;
    authContext: ApiTokenAuthContextType;
    minProfile: ApiTokenProfileType;
}


export interface MongoParamsUpdateInterface {
    database: string | undefined;
    apiDocument: ApiDocumentUpdate;
    apiFields: ApiFields;
    apiQuery: ApiQuery;
    apiOptions?: ApiOptions;
    connection: ApiConnection;
    info: any;
    applicationType: ApiTokenApplicationType,
    tokenType: ApiTokenType;
    authContext: ApiTokenAuthContextType;
    minProfile: ApiTokenProfileType;
}


export interface MongoParamsReadInterface {
    database: string | undefined;
    apiFields: ApiFields;
    apiQuery: ApiQuery;
    apiOptions?: ApiOptions;
    connection: ApiConnection;
    info: any;
    applicationType: ApiTokenApplicationType,
    tokenType: ApiTokenType;
    authContext: ApiTokenAuthContextType;
    minProfile: ApiTokenProfileType;
}


export interface MongoParamsDeleteInterface {
    database: string | undefined;
    apiDocument: ApiDocumentDelete;
    apiOptions?: ApiOptions;
    apiQuery: ApiQuery;
    connection: ApiConnection;
    info: any;
    applicationType: ApiTokenApplicationType,
    tokenType: ApiTokenType;
    authContext: ApiTokenAuthContextType;
    minProfile: ApiTokenProfileType;
}


export class ApiMongo {

    public static async insertOne(param: MongoParamsCreateInterface) {
        if (!param.connection.isValid('create', param)) {
            return {};
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.insertOne(configOptions, param.connection);
    }

    public static async insertMany(param: MongoParamsCreateInterface) {
        if (!param.connection.isValid('create', param)) {
            return {};
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.insertMany(configOptions, param.connection);
    }

    public static async findOneAndUpdate(param: MongoParamsUpdateInterface) {
        if (!param.connection.isValid('update', param)) {
            return {};
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.findOneAndUpdate(configOptions, param.connection);
    }

    public static async updateMany(param: MongoParamsUpdateInterface) {
        if (!param.connection.isValid('update', param)) {
            return [];
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.updateMany(configOptions, param.connection);
    }

    public static async find(param: MongoParamsReadInterface) {
        if (!param.connection.isValid('read', param)) {
            return [];
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }

        return await apiAdapterMongodb.find(configOptions, param.connection);
    }

    public static async findOne(param: MongoParamsReadInterface) {
        if (!param.connection.isValid('read', param)) {
            return {};
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.findOne(configOptions, param.connection);
    }

    public static async deleteOne(param: MongoParamsDeleteInterface) {
        if (!param.connection.isValid('delete', param)) {
            return {};
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.deleteOne(configOptions, param.connection);
    }

    public static async deleteMany(param: MongoParamsDeleteInterface) {
        if (!param.connection.isValid('delete', param)) {
            return {};
        }

        const configOptions: any = param;
        configOptions.apiOptions = param['apiOptions'] || (new ApiOptions());
        const apiAdapterMongodb: ApiAdapterMongodb = new ApiAdapterMongodb();
        if (!param.connection.mongoClient) {
            param.connection.mongoClient = await ApiMongo.mongoClient();
        }
        return await apiAdapterMongodb.deleteMany(configOptions, param.connection);
    }

    public static async toArray(cursor: any) {
        const proccessCursor: any = async (cursor: any) => {
            function promisse(cursor: any): Promise<any> {
                // @ts-ignore
                return new Promise<any>((resolve, reject) => {
                    cursor.toArray((error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }

            return await promisse(cursor);
        };

        return await proccessCursor(cursor);
    }

    /**
     * Cria cliente mongoDB
     *
     * @private
     */
    // @ts-ignore
    public static async mongoClient(): Promise<any> {
        // @ts-ignore
        return new Promise<any>((resolve, reject) => {
            //Cria a conexão com o servidor de base de dados
            MongoClient.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, mongo) => {
                if (error) {
                    reject(error);
                } else if (mongo) {
                    resolve(mongo);
                }
            });
        });
    }

    public static async count(cursor: any) {
        const proccessCursorCount: any = async (cursor: any) => {
            function promisse(cursor: any): Promise<any> {
                // @ts-ignore
                return new Promise<any>((resolve, reject) => {
                    cursor.count(false, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }

            return await promisse(cursor);
        };

        return await proccessCursorCount(cursor);
    }
}
