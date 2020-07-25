import {ApiToken, ApiTokenApplicationType, ApiTokenAuthContextType, ApiTokenProfileType, ApiTokenType} from '../token/api-token';
import {ApiMongo} from '../../api-mongo';
import {ApiConnection} from '../../api-connection';
import {ApiDocumentDelete} from '../../api-document-delete';
import {Api} from '../../api';
import {ApiOptions} from '../../api-options';
import {ApiQuery} from '../../api-query';
import {ApiDocument} from '../../api-document';
import {ApiFields} from '../../api-fields';


export class ApiAcmManager {
    public static configPolicies(resources: Array<any>): Array<any> {
        const result: Array<any> = [];

        const action: any = (item: any) => {
            const result: Array<string> = [];

            if (item.qry) {
                item.qry.forEach((qry) => {
                    result.push('qry:' + qry);
                });
            }
            if (item.mut) {
                item.mut.forEach((mut) => {
                    result.push('mut:' + mut);
                });
            }
            if (item.sub) {
                item.sub.forEach((sub) => {
                    result.push('sub:' + sub);
                });
            }

            return result;
        };

        resources.forEach((item) => {
            result.push({
                '_id': `srn:${process.env.SERVICE_NAME}:acm:::policy/AccessControl${item.module}`,
                'name': `AccessControl${item.module}`,
                'description': `Politica de controle de acesso do módulo ${item.module}`,
                'version': (new Date()).toLocaleDateString(),
                'sid': process.env.SERVICE_NAME,
                'type': 'default',
                'statement': {
                    'module': item.module,
                    'action': action(item)
                }
            })
        });

        return result;
    }

    public static async createPolicies(resources: Array<any>, connection: ApiConnection) {
        const policies: Array<any> = this.configPolicies(resources);
        const apiDocument: ApiDocument = await Api.documentCreate('__policies__', policies, connection);
        await ApiMongo.insertMany({
            database: process.env.DATABASE_NAME,
            apiDocument,
            connection,
            info: null,
            tokenType: ApiTokenType.accessToken,
            minProfile: ApiTokenProfileType.server5,
            applicationType: ApiTokenApplicationType.server,
            authContext: ApiTokenAuthContextType.ultraHigh30days
        });
    }

    public static async findPolicies(connection: ApiConnection) {
        const apiFields: ApiFields = new ApiFields('__policies__');
        const apiQuery: ApiQuery = new ApiQuery({
            type: 'user'
        });
        return await ApiMongo.find({
            database: process.env.DATABASE_NAME,
            apiFields,
            apiQuery,
            connection,
            info: null,
            tokenType: ApiTokenType.accessToken,
            minProfile: ApiTokenProfileType.server5,
            applicationType: ApiTokenApplicationType.server,
            authContext: ApiTokenAuthContextType.ultraHigh30days
        });
    }

    public static async updatePolicies(values: Array<any>, connection: ApiConnection) {
        const policies: any = await this.findPolicies(connection);

        console.log('-------------->>>>>>>:::', policies);
        //console.log('-------------->>>>>>>:::', values);

        const len: number = values.length;
        policies.result.forEach((item) => {
            const module: string = item.statement.module;
            //const validResources: Array<string> = [];
            for (let i = 0; i < len; i++) {
                if (values[i].module === module) {
                    //validResources.push()
                    console.log('values[i].resources', values[i].resources);
                    console.log('item.statement.resources', item.statement.action);
                    break;
                }
            }

            /*if(item.statement.hasOwnProperty('action')){
                item.statement.action.forEach((el)=>{

                })
            }*/


        });

    }

    public static async removePolicies(connection: ApiConnection) {
        const apiDocument: ApiDocumentDelete = await Api.documentDelete('__policies__', connection);
        const apiOptions: ApiOptions = new ApiOptions({projection: {_id: 1}});
        const apiQuery: ApiQuery = new ApiQuery({
            type: 'default'
        });

        await ApiMongo.deleteMany({
            // @ts-ignore
            database: process.env.DATABASE_NAME,
            apiDocument,
            apiOptions,
            apiQuery,
            connection,
            info: null,
            tokenType: ApiTokenType.accessToken,
            minProfile: ApiTokenProfileType.server5,
            applicationType: ApiTokenApplicationType.server,
            authContext: ApiTokenAuthContextType.ultraHigh30days
        });
    }

    public static async registerPolicies(resources: Array<any>) {
        console.log(`${process.env.SERVICE_NAME}:Register Policies`);
        //TODO:: Implementar token de aplicação
        const apiToken: ApiToken = new ApiToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiYXV0aCJdLCJjaWQiOiJoSnRYSVoydVNONWtiUWZidFROV2JwZG1oa1Y4RkpHLU9uYmM2bXhDY1lnIiwicHJmIjoiZGV2ZWxvcGVyIiwic3ViIjoiYWNjZXNzX3Rva2VuIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0NjAwIiwic2NvcGUiOiJjcmVhdGU6Y2l0eUNyZWF0ZSByZWFkOmNpdHkgcmVhZDpjaXRpZXMgdXBkYXRlOmNpdHlFZGl0IGRlbGV0ZTpjaXR5UmVtb3ZlIGNyZWF0ZTphdXRob3JpemUiLCJpYXQiOjE1OTQ3NzA2Mzh9.BAKvMyw65l-2kIyyfasLkNalq6pVps2Q1AiXirLcno4');
        const connection: ApiConnection = new ApiConnection(null, null, apiToken);

        await this.removePolicies(connection);
        await this.createPolicies(resources, connection);
        await this.updatePolicies(resources, connection);
    }
}
