import {ApiResultInsertOne} from '../../result/api-result-insert-one';
import {ApiDocument} from '../../api-document';
import {ApiOptions} from '../../api-options';
import {ApiQuery} from '../../api-query';
import {ApiFields} from '../../api-fields';
import {ApiMongo} from '../../api-mongo';
import {ApiDocumentUpdate} from '../../api-document-update';
import {ApiConnection} from '../../api-connection';
import {ApiDocumentDelete} from '../../api-document-delete';
import {ApiResultInsertMany} from '../../result/api-result-insert-many';

//const AWS = require('aws-sdk');

/*
declare const require;
const Db = require('mongodb').Db,
        MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server,
        ReplSetServers = require('mongodb').ReplSetServers,
        ObjectID = require('mongodb').ObjectID,
        Binary = require('mongodb').Binary,
        GridStore = require('mongodb').GridStore,
        Grid = require('mongodb').Grid,
        Code = require('mongodb').Code,
        //BSON = require('mongodb').pure().BSON,
        assert = require('assert');
*/

export class ApiAdapterMongodb {
    //private _client: any;

    async updateMany(param: { database: string; apiDocument: ApiDocumentUpdate; apiQuery: ApiQuery, apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {

        function promisse(collection: any): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                collection.updateMany(param.apiQuery.value, param.apiDocument.value, param.apiOptions.update, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiDocument.collection);

        const cursor: any = await promisse(collection);
        const data: any = {
            result: null
        };

        if (cursor.result.ok) {
            data.modifiedCount = 1;
        }
        return data;
    }

    async findOneAndUpdate(param: {
        database: string; apiDocument: ApiDocumentUpdate; apiFields: ApiFields; apiQuery: ApiQuery,
        apiOptions: ApiOptions;
    }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.findOneAndUpdate(param.apiQuery.value, param.apiDocument.value, param.apiOptions.find, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result || {});
                    }

                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiFields.collection);
        const cursor: any = await promisse(collection);

        const data: any = {
            updatedExisting: false,
            result: null,

        };
        if (Object.keys(cursor).length) {
            data.result = cursor.value;
            data.updatedExisting = cursor.lastErrorObject.updatedExisting;
        }
        return data;
    }

    async findOne(param: { database: string; apiFields: ApiFields; apiQuery: ApiQuery, apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.findOne(param.apiQuery.value, param.apiOptions.find, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result || {});
                    }

                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiFields.collection);
        const cursor: any = await promisse(collection);

        const data: any = {
            result: null
        };
        if (Object.keys(cursor).length) {
            data.result = cursor;
        }
        return data;
    }

    async deleteOne(param: { database: string; apiDocument: ApiDocumentDelete; apiQuery: ApiQuery, apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.deleteOne(param.apiQuery.value, param.apiOptions.delete, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result || {});
                    }
                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiDocument.collection);
        const cursor: any = await promisse(collection);
        const data: any = {
            result: null
        };
        if (Object.keys(cursor).length) {
            data.result = cursor;
        }
        return data;
    }

    async deleteMany(param: { database: string; apiDocument: ApiDocumentDelete; apiQuery: ApiQuery, apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.deleteMany(param.apiQuery.value, param.apiOptions.delete, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result || {});
                    }
                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiDocument.collection);
        const cursor: any = await promisse(collection);
        const data: any = {
            result: null
        };
        if (Object.keys(cursor).length) {
            data.result = cursor;
        }
        return data;
    }

    /**
     * Busca o primeiro documento que corresponde à consulta
     */
    // @ts-ignore
    async find(param: { database: string; apiFields: ApiFields; apiQuery: ApiQuery, apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.find(param.apiQuery.value, param.apiOptions.find, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiFields.collection);
        const cursor: any = await promisse(collection);
        const dataArray: Array<any> = await ApiMongo.toArray(cursor);
        const data: any = {
            result: null
        };
        if (Object.keys(dataArray).length) {
            data.result = dataArray;
        }
        return data;
    }

    /**
     * Insere um único documento no MongoDB.
     * Se os documentos passados não contiverem o campo _id, um será adicionado a cada um dos documentos que faltam ao driver, alterando o documento.
     * Esse comportamento pode ser sobrescrito, definindo o sinalizador forceServerObjectId.
     */
    // @ts-ignore
    async insertOne(param: { database: string; apiDocument: ApiDocument; apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.insertOne(param.apiDocument.value, param.apiOptions.insert, (error, result) => {
                    if (error) {
                        resolve({success: false, error});
                    } else if (result) {
                        resolve({success: result, result});
                    }
                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiDocument.collection);
        const data: any = await promisse(collection);
        let apiResult: any;
        if(data.success){
            apiResult = new ApiResultInsertOne(data.result);
        }
        else {
            apiResult = {};
            connection.error.add(data.error.code.toString(), data.error.message, data.error.name);
        }

        return apiResult.value;
    }

    /**
     * Insere uma matriz de documentos no MongoDB. Se os documentos enviados não contiverem o campo _id ,
     * um será adicionado a cada um dos documentos ausentes pelo driver, modificando o documento. Esse comportamento
     * pode ser substituído, definindo o sinalizador forceServerObjectId .
     */
    // @ts-ignore
    async insertMany(param: { database: string; apiDocument: ApiDocument; apiOptions: ApiOptions; }, connection: ApiConnection): Promise<any> {
        function promisse(collection: any): Promise<any> {
            // @ts-ignore
            return new Promise<any>((resolve, reject) => {
                collection.insertMany(param.apiDocument.value, param.apiOptions.insertMany, (error, result) => {
                    if (error) {
                        resolve({success: false, error});
                    } else if (result) {
                        resolve({success: result, result});
                    }
                });
            });
        }

        const db: any = connection.mongoClient.db(param.database);
        const collection: any = db.collection(param.apiDocument.collection);
        const data: any = await promisse(collection);
        let apiResult: any;
        if(data.success){
            apiResult = new ApiResultInsertMany(data.result);
        }
        else {
            apiResult = {};
            connection.error.add(data.error.code.toString(), data.error.message, data.error.name);
        }

        return apiResult.value;
    }
}
