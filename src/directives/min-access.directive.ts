import {ApiConnection} from '../api-connection';
import {SchemaDirectiveVisitor} from 'apollo-server';

const {defaultFieldResolver} = require('graphql');


export class MinAccessDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = async function (...args) {
            // @ts-ignore
            const [_, __, context, info] = args;
            const result = await resolve.apply(this, args);
            if (context.hasOwnProperty('connection')) {
                const connection: ApiConnection = (context['connection']);
                if (connection && connection.hasOwnProperty('auth')) {
                    const accessLevel: boolean = await connection.auth.accessLevel(info);
                    if (accessLevel) {
                        return result;
                    }
                }
            }
            return null;
        };
    }
}
