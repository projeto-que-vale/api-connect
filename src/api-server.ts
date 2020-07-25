import 'apollo-cache-control';
import {ApiModuleManager} from './api.module.manager';
import {ApiConnection} from './api-connection';
import {Api} from './api';
import {MinAccessDirective} from './directives/min-access.directive';

const depthLimit = require('graphql-depth-limit');
const {MemcachedCache} = require('apollo-server-memcached');
const {ApolloServer, PubSub} = require('apollo-server');


export class ApiServer {
    // @ts-ignore
    constructor(opts?: any) {
        const typeDefs = ApiModuleManager.typeDefs;
        const resolvers = ApiModuleManager.resolvers;
        const pubSub = new PubSub();

        const myPlugin = {
            // @ts-ignore
            requestDidStart(requestContext) {
                console.log('MY_PLUGIN');
                return {
                    // @ts-ignore
                    parsingDidStart(action) {
                        console.log('PARSING_DID_START');
                        //console.log(action);
                    },
                    // @ts-ignore
                    validationDidStart(action) {
                        console.log('VALIDATION_DID_START');
                        //console.log(action);
                    },
                    // @ts-ignore
                    didResolveOperation(action) {
                        //console.log('DID_RESOLVE_OPERATION');
                    },
                    // @ts-ignore
                    responseForOperation(action) {
                        //console.log('RESPONSE_FOR_OPERATION');
                    },
                    // @ts-ignore
                    executionDidStart(action) {
                        ///console.log('EXECUTION_DID_START');
                    },
                    // @ts-ignore
                    didEncounterErrors(action) {
                        console.log('DID_ENCOUNTER_ERRORS');
                        //console.log(action);
                    },
                    willSendResponse(action) {
                        console.log('WILL_SEND_RESPONSE');
                        if (action.context.hasOwnProperty('connection') && action.response.hasOwnProperty('data') && action.response.data) {
                            action.response.data.success = true;
                            action.response.data.elapsedTime = action.context.connection.lifeTime;
                            if (!action.context.connection.ready) {
                                action.response.data.success = false;
                                action.response.data.error = action.context.connection.error.errors;
                            }
                            action.response.data.accessControl = action.context.connection.auth.accessControl;
                        }
                    },
                }
            }
        };

        /**
         * https://stackoverflow.com/questions/9198310/how-to-set-node-env-to-production-development-in-os-x
         * https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/
         */
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            playground: true,
            schemaDirectives: {
                minAccess: MinAccessDirective
            },
            onHealthCheck: (value) => {
                console.log('onHealthCheck---->>>', value);
                const status: boolean = false;
                return new Promise((resolve, reject) => {
                    if (status) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            },
            /*engine: {
                apiKey: 'service:meuTest:Ze7lhZcz8eRKSyaBcXUBEw',
                schemaTag: 'development',
            },*/
            validationRules: [depthLimit(10)],
            persistedQueries: {
                cache: new MemcachedCache(
                        ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
                        {retries: 10, retry: 10000}, // Options
                ),
            },
            context: async ({req, res}) => {
                const connection: ApiConnection = await Api.connection(req, res);
                return {connection, pubSub};
            },
            cacheControl: {
                defaultMaxAge: 5,
            },
            debug: false,
            plugins: [myPlugin],
            subscriptions: {
                path: '/subscriptions',
                // @ts-ignore
                onConnect: async (connectionParams, webSocket, context) => {
                    console.log(`Subscription client connected using Apollo server's built-in SubscriptionServer.`, connectionParams)
                },
                // @ts-ignore
                onDisconnect: async (webSocket, context) => {
                    console.log(`Subscription client disconnected.`)
                }
            }
        });

        server.listen({port: process.env.PORT}).then(({url}) => {
            console.log(`ApiConnect Inicializado ${url}`);
        });
    }
}
