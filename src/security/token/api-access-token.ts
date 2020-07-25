import {ApiTokenAbstract} from './api-token.abstract';
import {ApiTokenOptionsInterface, ApiTokenType} from './api-token';


export class ApiAccessToken extends ApiTokenAbstract {
    constructor(options: ApiTokenOptionsInterface) {
        super(options);
        this.subject = ApiTokenType.accessToken;
    }
}
