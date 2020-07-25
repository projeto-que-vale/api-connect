export abstract class ApiResultAbstract {
    /**
     * Dados que devem ser retornados para o cliente
     */
    private _value: any;

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        this._value = value;
    }
}
