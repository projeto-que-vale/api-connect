import {ApiResultAbstract} from './api-result.abstract';


export class ApiResultLogicalExclusion extends ApiResultAbstract {
    constructor(data: any) {
        super();
        this.value = {
            success: !!data.result.nModified,
            modifiedCount: data.modifiedCount
        };
    }
}
