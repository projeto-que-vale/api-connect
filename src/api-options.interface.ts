export interface ApiOptionsInterface {

    /**
     * Configure o batchSize para o getMoreCommand ao iterar nos resultados da consulta.
     */
    batchSize?: number;

    /**
     * Permitir que o driver contorne a validação de esquema no MongoDB 3.2 ou superior.
     */
    bypassDocumentValidation?: boolean;

    /**
     * Especifique as configurações de agrupamento (MongoDB 3.4 ou superior) para a operação de atualização
     * (consulte a documentação do 3.4 para obter os campos disponíveis).
     */
    collation?: object;

    /**
     * Se true, será lançado se os documentos bson começarem com $ ou incluirem um . em qualquer valor-chave.
     */
    checkKeys?: boolean;

    /**
     * Você pode colocar um campo $comment em uma consulta para facilitar a procura nos logs do profiler.
     */
    comment?: string;

    /**
     * Explique a consulta em vez de retornar os dados.
     */
    explain?: boolean;

    /**
     * Force o servidor a atribuir valores de _id em vez de driver.
     */
    forceServerObjectId?: boolean;

    /**
     * Diga a consulta para usar índices específicos na consulta. Objeto dos índices a serem usados, {'_id': 1}
     */
    hint?: object;

    /**
     * Especifique se o serializador BSON deve ignorar campos indefinidos.
     */
    ignoreUndefined?: boolean;

    /**
     * Define o limite de documentos retornados na consulta.
     */
    limit?: number;

    /**
     * Especifique uma preocupação de gravação do journal.
     */
    j?: boolean;

    /**
     * Número de milissegundos a aguardar antes de interromper a consulta.
     */
    maxTimeMS?: number;

    /**
     * Define limites mínimo de índice.
     */
    max?: number;

    /**
     * Define limites máximo de índice.
     */
    min?: number;

    /**
     * Se true, quando uma inserção falhar, não execute as gravações restantes. Se false, continue com as inserções restantes quando uma falhar.
     */
    ordered?: boolean;

    /**
     * Especifique se o cursor deve retornar resultados parciais ao consultar um sistema particionado
     */
    partial?: boolean;

    /**
     * Derfine os campos a serem retornados na consulta. Objeto de campos para incluir ou excluir (não ambos),
     * incluir {'a': 1} - excluir {'a': -1} ou incluir {'a': true} ou excluir {'a': false}
     */
    projection?: object;

    /**
     * Promove valores BSON binários para buffers de nó nativos.
     */
    promoteBuffers?: boolean;

    /**
     * Promove valores longos para numerar se eles caberem dentro da resolução de 53 bits.
     */
    promoteLongs?: boolean;

    /**
     * Promotes BSON values to native types where possible, set to false to only receive wrapper types.
     */
    promoteValues?: boolean;

    /**
     * Devolve os resultados do documento como buffers BSON brutos.
     */
    raw?: boolean;

    /**
     * A preferência de leitura preferida
     * ReadPreference.PRIMARY,
     * ReadPreference.PRIMARY_PREFERRED,
     * ReadPreference.SECONDARY,
     * ReadPreference.SECONDARY_PREFERRED,
     * ReadPreference.NEAREST.
     */
    readPreference?: string;

    /**
     * Apenas retorne a chave do índice.
     */
    returnKey?: boolean;

    /**
     * Sessão opcional para usar nesta operação
     */
    session?: any;

    /**
     * Serialize funções em qualquer objeto.
     */
    serializeFunctions?: boolean;

    /**
     * Mostrar a localização dos resultados no disco.
     */
    showDiskLoc?: boolean;

    /**
     * Define para pular N documentos à frente em sua consulta (útil para paginação).
     */
    skip?: number;

    /**
     * Define a ordem de classificação dos documentos que retornam da consulta. Matriz de índices, [['a', 1]] etc.
     */
    sort?: Array<any> | object;

    /**
     * Especifique se o cursor está disponível.
     */
    tailable?: boolean;

    /**
     * Especifique se o cursor pode expirar.
     */
    timeout?: boolean;

    /**
     * A operação de atualização é um upsert.
     */
    upsert?: boolean;

    /**
     * Quando falso, retorna o documento atualizado em vez do original. O padrão é verdadeiro.
     */
    returnOriginal?: boolean;

    /**
     * A preocupação de gravação.
     */
    w?: number | string;

    /**
     * O tempo limite da preocupação de gravação.
     */
    wtimeout?: number;
}
