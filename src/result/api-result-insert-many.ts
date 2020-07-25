import {ApiResultAbstract} from './api-result.abstract';


export class ApiResultInsertMany extends ApiResultAbstract {
    constructor(data: any) {
        super();

        const dataTmp: any = {result: null};
        let cursor: any = {};

        if (data.ops) {
            cursor = data.ops[0];
        }
        if (Object.keys(cursor).length) {
            dataTmp.result = cursor;
        }
        this.value = dataTmp;
    }
}
