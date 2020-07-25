import {ApiDocument} from './api-document';
import {ApiDocumentUpdate} from './api-document-update';
import {ApiConnection} from './api-connection';
import {ApiConnections} from './api-connections';
import {ApiDocumentDelete} from './api-document-delete';


export class Api {

    public static async connection(req: any, res: any): Promise<ApiConnection> {
        // @ts-ignore
        return new Promise<ApiConnection>((resolve) => {
            resolve(ApiConnections.connection(req, res));
        });
    }

    public static documentCreate(collection: string, input: any, connection: any): ApiDocument {
        if (Object.keys(input).length) {
            return new ApiDocument(collection, input, connection);
        } else {
            throw new Error(`Cannot be empty.`);
        }
    }

    public static documentUpdate(collection: string, input: any, connection: any): ApiDocumentUpdate {
        return new ApiDocumentUpdate(collection, input, connection);
    }

    public static documentDelete(collection: string, connection: any): ApiDocumentDelete {
        return new ApiDocumentDelete(collection, connection);
    }

    static async hasResultNode(path: string, info: any) {
        let result: boolean = false;

        function promisse(): Promise<any> {
            return new Promise<any>((resolve) => {
                const findResultNode: any = (selections: Array<any>) => {
                    selections.forEach((item) => {
                        if (item.name.value === path) {
                            result = true;
                        } else if (item.selectionSet) {
                            findResultNode(item.selectionSet.selections);
                        }
                    });
                };
                info.fieldNodes.forEach((item) => {
                    if (item.hasOwnProperty('selectionSet')) {
                        item.selectionSet.selections.forEach((child) => {
                            if (child.name.value === 'result') {
                                findResultNode(child.selectionSet.selections);
                            }
                        });
                    }
                });
                resolve(result);
            });
        }

        return await promisse();
    }

    static async hasInputNode(path: string, info: any) {
        let result: boolean = false;

        function promisse(): Promise<any> {
            return new Promise<any>((resolve) => {
                const findInputNode: any = (selections: Array<any>) => {
                    selections.forEach((item) => {
                        if (item.name.value === path) {
                            result = true;
                        }
                    });
                };
                info.fieldNodes.forEach((item) => {
                    if (item.hasOwnProperty('arguments')) {
                        item.arguments.forEach((child) => {
                            if (child.name.value === 'input') {
                                findInputNode(child.value.fields);
                            }
                        });
                    }
                });
                resolve(result);
            });
        }

        return await promisse();
    }

    static async inputConnection(input: any) {
        return Object.assign({}, input);
    }
}
