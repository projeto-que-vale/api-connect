export class ApiFields {

    public value: any;
    public collection: any;

    // TODO :: Implementar definição de campos via fragments
    constructor(collection: string, info?: any, scope?: string) {
        this.collection = collection;
        if (info) {
            this._config(info, scope);
        }
    }

    private _config(info: any, scope?: string) {
        const listFields: Array<any> = [];
        const fields: any = {_id: 1};
        const getField = (el: any, listFields: Array<any>) => {
            if (el && el.hasOwnProperty('kind') && el.kind === 'SelectionSet') {
                el.selections.forEach((item) => {
                    if (item.kind === 'Field') {
                        if (item.selectionSet) {
                            const itemListFields: Array<string> = [item.name.value];
                            listFields.push(itemListFields);
                            getField(item.selectionSet, itemListFields);
                        } else {
                            listFields.push(item.name.value);
                        }
                    }
                });
            }
        };

        if (info.hasOwnProperty('fieldNodes')) {
            const selectionSet: Array<any> = info.fieldNodes[0]['selectionSet'];

            getField(selectionSet, listFields);

            const configureFields = (fields: any, listFields: Array<any>) => {

                const processChild = (nodeField: string, el: Array<any>, fields: any) => {
                    el.forEach((item) => {
                        if (Array.isArray(item)) {
                            const childNodeField: string = item.shift();
                            if (nodeField === 'result') {
                                processChild(childNodeField, item, fields);
                            } else {
                                processChild(nodeField + '.' + childNodeField, item, fields);
                            }
                        } else {
                            if (nodeField === 'result') {
                                fields[item] = 1;
                            } else {
                                fields[nodeField + '.' + item] = 1;
                            }
                        }
                    });
                };
                listFields.forEach((el) => {
                    if (Array.isArray(el)) {
                        const nodeField: string = el.shift();
                        processChild(nodeField, el, fields);
                    } else {
                        fields[el] = 1;
                    }
                });
            };
            configureFields(fields, listFields);

            //console.log('FIELDS---->>>', fields);
            //console.log('LIST_FIELDS---->>>', listFields);
            //console.log('scope--->>>', scope);

            if (scope) {
                const fieldsTmp: any = {_id: 1};
                for (const field in fields) {
                    if (field.indexOf(scope) === 0) {
                        fieldsTmp[(field.substr(scope.length + 1))] = 1;
                    }
                }

                this.value = fieldsTmp;
            } else {
                this.value = fields;
            }
        }
    }
}
