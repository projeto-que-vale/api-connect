import {ApiResultAbstract} from './api-result.abstract';


export class ApiResultFindOne extends ApiResultAbstract {

    constructor(data: any) {
        super();
        this.value = data || {};
    }
}
