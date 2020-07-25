import {ApiResultAbstract} from './api-result.abstract';


export class ApiResultUpdateOne extends ApiResultAbstract {

    constructor(data: any) {
        super();
        this.value = {
            success: (data.result.nModified > 0),
            data: {},
            modifiedCount: data.result.nModified
        };
    }
}
