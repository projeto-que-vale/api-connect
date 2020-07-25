import {ApiToken} from './security/token/api-token';

const axios = require('axios');


export class ApiRequest {

    constructor(public uri: string, public token: string) {
    }

    public static authToken(apiToken: ApiToken): ApiRequest {
        return new ApiRequest(apiToken.issuer, apiToken.token);
    }

    /**
     * Realiza consulta em endpoints graphql externos
     */
    public async fetch(query: string, variables: any) {
        const endPoint: string = this.uri;
        const autorization: string = 'Bearer ' + this.token;
        const body: { query: string; variables: any; } = {query, variables};

        function promisse(): Promise<any> {
            return new Promise<any>((resolve) => {
                axios.defaults.headers.common['Authorization'] = autorization;
                axios.post(endPoint, body)
                        .then((response) => {
                            resolve(response.data);
                        })
                        .catch((result) => {
                            resolve({
                                data: {
                                    success: false,
                                    result: null,
                                    error: result.response.data.errors
                                }
                            });
                        });
            });
        }

        return promisse();
    }
}
