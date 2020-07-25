import {ApiOptionsInterface} from './api-options.interface';

declare const require;
const ReadPreference = require('mongodb').ReadPreference;


export class ApiOptions implements ApiOptionsInterface {
    constructor(options?: ApiOptionsInterface) {
        for (const key in options) {
            this[key] = options[key];
        }
    }


    /**
     * Lista opcional de filtros de matriz referenciados em operadores posicionais filtrados
     */
    private _arrayFilters: Array<any> = [];

    public get arrayFilters(): Array<any> {
        return this._arrayFilters;
    }

    public set arrayFilters(value: Array<any>) {
        this._arrayFilters = value;
    }

    /**
     * Configure o batchSize para o getMoreCommand ao iterar nos resultados da consulta.
     */
    private _batchSize: number = 2;

    public get batchSize(): number {
        return this._batchSize;
    }

    public set batchSize(value: number) {
        this._batchSize = value;
    }

    /**
     * Permitir que o driver contorne a validação de esquema no MongoDB 3.2 ou superior.
     */
    private _bypassDocumentValidation?: boolean | undefined = false;

    public get bypassDocumentValidation(): boolean | undefined {
        return this._bypassDocumentValidation;
    }

    public set bypassDocumentValidation(value: boolean | undefined) {
        this._bypassDocumentValidation = value;
    }

    /**
     * Se true, será lançado se os documentos bson começarem com $ ou incluirem um . em qualquer valor-chave.
     */
    private _checkKeys: any;

    get checkKeys(): any {
        return this._checkKeys;
    }

    set checkKeys(value: any) {
        this._checkKeys = value;
    }

    /**
     * Especifique as configurações de agrupamento (MongoDB 3.4 ou superior) para a operação de atualização
     * (consulte a documentação do 3.4 para obter os campos disponíveis).
     */
    private _collation: object;

    public get collation(): object {
        return this._collation;
    }

    public set collation(value: object) {
        this._collation = value;
    }

    /**
     * Você pode colocar um campo $comment em uma consulta para facilitar a procura nos logs do profiler.
     */
    private _comment: string;

    public get comment(): string {
        return this._comment;
    }

    public set comment(value: string) {
        this._comment = value;
    }

    /**
     * Explique a consulta em vez de retornar os dados.
     */
    private _explain: boolean = false;

    public get explain(): boolean {
        return this._explain;
    }

    public set explain(value: boolean) {
        this._explain = value;
    }

    /**
     * Force o servidor a atribuir valores de _id em vez de driver.
     */
    private _forceServerObjectId?: boolean | undefined = false;

    public get forceServerObjectId(): boolean | undefined {
        return this._forceServerObjectId;
    }

    public set forceServerObjectId(value: boolean | undefined) {
        this._forceServerObjectId = value;
    }

    /**
     * Diga a consulta para usar índices específicos na consulta. Objeto dos índices a serem usados, {'_id': 1}
     */
    private _hint: object;

    public get hint(): object {
        return this._hint;
    }

    public set hint(value: object) {
        this._hint = value;
    }

    /**
     * Especifique se o serializador BSON deve ignorar campos indefinidos.
     */
    private _ignoreUndefined: any;

    get ignoreUndefined(): any {
        return this._ignoreUndefined;
    }

    set ignoreUndefined(value: any) {
        this._ignoreUndefined = value;
    }

    /**
     * Define o limite de documentos retornados na consulta.
     */
    private _limit: number = 100;

    public get limit(): number {
        return this._limit;
    }

    public set limit(value: number) {
        this._limit = value;
    }

    /**
     * Especifique uma preocupação de gravação do journal.
     */
    private _j?: boolean | undefined = false;

    public get j(): boolean | undefined {
        return this._j;
    }

    public set j(value: boolean | undefined) {
        this._j = value;
    }

    /**
     * Número de milissegundos a aguardar antes de interromper a consulta.
     */
    private _maxTimeMS: number;

    public get maxTimeMS(): number {
        return this._maxTimeMS;
    }

    public set maxTimeMS(value: number) {
        this._maxTimeMS = value;
    }

    /**
     * Define limites mínimo de índice.
     */
    private _max: number;

    public get max(): number {
        return this._max;
    }

    public set max(value: number) {
        this._max = value;
    }

    /**
     * Define limites máximo de índice.
     */
    private _min: number;

    public get min(): number {
        return this._min;
    }

    public set min(value: number) {
        this._min = value;
    }

    /**
     * Se true, quando uma inserção falhar, não execute as gravações restantes. Se false, continue com as inserções restantes quando uma falhar.
     */
    private _ordered: boolean = true;

    public get ordered(): boolean {
        return this._ordered;
    }

    public set ordered(value: boolean) {
        this._ordered = value;
    }

    /**
     * Especifique se o cursor deve retornar resultados parciais ao consultar um sistema particionado
     */
    private _partial: boolean = false;

    public get partial(): boolean {
        return this._partial;
    }

    public set partial(value: boolean) {
        this._partial = value;
    }

    /**
     * Derfine os campos a serem retornados na consulta. Objeto de campos para incluir ou excluir (não ambos),
     * incluir {'a': 1} - excluir {'a': -1} ou incluir {'a': true} ou excluir {'a': false}
     */
    private _projection: object;

    public get projection(): object {
        return this._projection;
    }

    public set projection(value: object) {
        this._projection = value;
    }

    /**
     * Quando falso, retorna o documento atualizado em vez do original. O padrão é verdadeiro.
     */
    private _returnOriginal: boolean = true;

    public get returnOriginal(): boolean {
        return this._returnOriginal;
    }

    public set returnOriginal(value: boolean) {
        this._returnOriginal = value;
    }

    /**
     * Promove valores BSON binários para buffers de nó nativos.
     */
    private _promoteBuffers: boolean = false;

    public get promoteBuffers(): boolean {
        return this._promoteBuffers;
    }

    public set promoteBuffers(value: boolean) {
        this._promoteBuffers = value;
    }

    /**
     * Promove valores longos para numerar se eles caberem dentro da resolução de 53 bits.
     */
    private _promoteLongs: boolean = true;

    public get promoteLongs(): boolean {
        return this._promoteLongs;
    }

    public set promoteLongs(value: boolean) {
        this._promoteLongs = value;
    }

    /**
     * Promotes BSON values to native types where possible, set to false to only receive wrapper types.
     */
    private _promoteValues: boolean = true;

    public get promoteValues(): boolean {
        return this._promoteValues;
    }

    public set promoteValues(value: boolean) {
        this._promoteValues = value;
    }

    /**
     * Devolve os resultados do documento como buffers BSON brutos.
     */
    private _raw: boolean = false;

    public get raw(): boolean {
        return this._raw;
    }

    public set raw(value: boolean) {
        this._raw = value;
    }

    /**
     * A preferência de leitura preferida
     * ReadPreference.PRIMARY,
     * ReadPreference.PRIMARY_PREFERRED,
     * ReadPreference.SECONDARY,
     * ReadPreference.SECONDARY_PREFERRED,
     * ReadPreference.NEAREST.
     */
    private _readPreference: string = ReadPreference.PRIMARY_PREFERRED;

    public get readPreference(): string {
        return this._readPreference;
    }

    public set readPreference(value: string) {
        this._readPreference = value;
    }

    /**
     * Apenas retorne a chave do índice.
     */
    private _returnKey: boolean = false;

    public get returnKey(): boolean {
        return this._returnKey;
    }

    public set returnKey(value: boolean) {
        this._returnKey = value;
    }

    /**
     * Sessão opcional para usar nesta operação
     */
    private _session: any;

    public get session(): any {
        return this._session;
    }

    public set session(value: any) {
        this._session = value;
    }

    /**
     * Serialize funções em qualquer objeto.
     */
    private _serializeFunctions?: boolean | undefined = false;

    public get serializeFunctions(): boolean | undefined {
        return this._serializeFunctions;
    }

    public set serializeFunctions(value: boolean | undefined) {
        this._serializeFunctions = value;
    }

    /**
     * Mostrar a localização dos resultados no disco.
     */
    private _showDiskLoc: boolean = false;

    public get showDiskLoc(): boolean {
        return this._showDiskLoc;
    }

    public set showDiskLoc(value: boolean) {
        this._showDiskLoc = value;
    }

    /**
     * Define para pular N documentos à frente em sua consulta (útil para paginação).
     */
    private _skip: number = 0;

    public get skip(): number {
        return this._skip;
    }

    public set skip(value: number) {
        this._skip = value;
    }

    /**
     * Define a ordem de classificação dos documentos que retornam da consulta. Matriz de índices, [['a', 1]] etc.
     */
    private _sort: Array<any> | object;

    public get sort(): Array<any> | object {
        return this._sort;
    }

    public set sort(value: Array<any> | object) {
        this._sort = value;
    }

    /**
     * Especifique se o cursor está disponível.
     */
    private _tailable: boolean = false;

    public get tailable(): boolean {
        return this._tailable;
    }

    public set tailable(value: boolean) {
        this._tailable = value;
    }

    /**
     * Especifique se o cursor pode expirar.
     */
    private _timeout: boolean = false;

    public get timeout(): boolean {
        return this._timeout;
    }

    public set timeout(value: boolean) {
        this._timeout = value;
    }

    /**
     * A operação de atualização é um upsert.
     */
    private _upsert: boolean = false;

    public get upsert(): boolean {
        return this._upsert;
    }

    public set upsert(value: boolean) {
        this._upsert = value;
    }

    /**
     * A preocupação de gravação.
     */
    private _w?: number | string | undefined;

    public get w(): number | string | undefined {
        return this._w;
    }

    public set w(value: number | string | undefined) {
        this._w = value;
    }

    /**
     * O tempo limite da preocupação de gravação.
     */
    private _wtimeout?: number | undefined;

    public get wtimeout(): number | undefined {
        return this._wtimeout;
    }

    public set wtimeout(value: number | undefined) {
        this._wtimeout = value;
    }

    /**
     * Retorna todas as configurações necessárias para realizar consulta na base de dados
     */
    public get find(): any {
        return {
            //batchSize: this.batchSize,
            comment: this.comment,
            collation: this.collation,
            explain: this.explain,
            hint: this.hint,
            limit: this.limit,
            max: this.max,
            maxTimeMS: this.maxTimeMS,
            min: this.min,
            partial: this.partial,
            projection: this.projection,
            returnOriginal: this.returnOriginal,
            promoteLongs: this.promoteLongs,
            promoteValues: this.promoteValues,
            promoteBuffers: this.promoteBuffers,
            raw: this.raw,
            readPreference: this.readPreference,
            returnKey: this.returnKey,
            session: this.session,
            showDiskLoc: this.showDiskLoc,
            skip: this.skip,
            sort: this.sort,
            tailable: this.tailable,
            timeout: this.timeout
        };
    }

    public get delete(): any {
        return {
            collation: this.collation,
            w: this.w,
            wtimeout: this.wtimeout,
            j: this.j,
            checkKeys: this.checkKeys,
            serializeFunctions: this.serializeFunctions,
            ignoreUndefined: this.ignoreUndefined,
            session: this.session,
            hint: this.hint
        };
    }

    /**
     * Retorna as configurações opções para inserir um documento na base de dados
     */
    public get insert(): any {
        return {
            w: this.w,
            wtimeout: this.wtimeout,
            j: this.j,
            serializeFunctions: this.serializeFunctions,
            forceServerObjectId: this.forceServerObjectId,
            bypassDocumentValidation: this.bypassDocumentValidation,
            session: this.session,
        };
    }

    /**
     * Retorna as configurações opções para inserir um documento na base de dados
     */
    public get insertMany(): any {
        return {
            bypassDocumentValidation: this.bypassDocumentValidation,
            ordered: this.ordered,
            forceServerObjectId: this.forceServerObjectId,
            w: this.w,
            wtimeout: this.wtimeout,
            j: this.j,
            checkKeys: this.checkKeys,
            serializeFunctions: this.serializeFunctions,
            ignoreUndefined: this.ignoreUndefined,
            session: this.session,
        };
    }

    /**
     * Retorna as configurações opções para atualizar um documento na base de dados
     */
    public get update(): any {
        return {
            upsert: this.upsert,
            w: this.w,
            wtimeout: this.wtimeout,
            j: this.j,
            bypassDocumentValidation: this.bypassDocumentValidation,
            arrayFilters: this.arrayFilters,
            session: this.session,
        };
    }
}
