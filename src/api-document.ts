import {ApiSecurity} from './security/api-security';


export class ApiDocument {
    private _checksum: string;
    private _blockChain: string;
    constructor(public collection: string, public input: any, public connection: any) {
        this.input.logDocument = {};
    }

    get value() {
        return this.input;
    }

    accessControlCreate(info: any) {
        this._checksum = ApiSecurity.checksum(this.input);
        this._blockChain = ApiSecurity.checksum(this.input);
        this.input = this.connection.auth.accessControlInput(this.input, info);
        this.input._info = {
            application: this.connection.auth.application(this.collection),
            security: {
                checksum: this._checksum,
                blockChain: this._blockChain,
            },
            history: [
                {
                    action: 'CREATED_DOCUMENT',
                    checksum: this._checksum,
                    blockChain: this._blockChain,
                    date: new Date(),
                    user: this.connection.auth.user
                }
            ]
        };
        return this;
    }

    async accessControlUpdate(info: any) {
        this._checksum = ApiSecurity.checksum(this.input);
        this.input = await this.connection.auth.accessControlInput(this.input, info);
        this.input._info = {
            security: {
                checksum: this._checksum,
                //TODO:: Recuperar o identificador do checksum do documento existente
                blockChain: this._blockChain,
            },
            history: [
                {
                    action: 'UPDATED_DOCUMENT',
                    checksum: this._checksum,
                    blockChain: this._blockChain,
                    date: new Date(),
                    user: this.connection.auth.user
                }
            ]
        };
        return this;
    }

    async history(message: string) {
        this.input._info.history.push({
            action: message,
            checksum: this._checksum,
            blockChain: this._blockChain,
            date: new Date(),
            user: this.connection.auth.user
        });
        return this;
    }

    /**
     * Indica a data e o usuário que aprovou o documento
     */
    logApprovedAt(): ApiDocument {
        this.input.logDocument.approvedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que criou o documento
     */
    logCreatedAt(): ApiDocument {
        this.input.logDocument.createdAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que fechou o documento
     */
    logClosedAt(): ApiDocument {
        this.input.logDocument.closedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário deletou o documento
     */
    logDeletedAt(): ApiDocument {
        this.input.logDocument.deletedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário mais recente que desabilitou o documento
     */
    logDisabledAt(): ApiDocument {
        this.input.logDocument.disabledAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que habilitou o documento
     */
    logEnabledAt(): ApiDocument {
        this.input.logDocument.enabledAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica que foi concluído
     */
    logEndedAt(): ApiDocument {
        this.input.logDocument.endedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que abriu o documento
     */
    logOpenedAt(): ApiDocument {
        this.input.logDocument.openedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que pausou o progresso
     */
    logPausedAt(): ApiDocument {
        this.input.logDocument.pausedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que rejeitou o documento
     */
    logRejectedAt(): ApiDocument {
        this.input.logDocument.rejectedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que reabriu o documento
     */
    logReopenedAt(): ApiDocument {
        this.input.logDocument.reopenedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que o documento entrou em revisão
     */
    logReviewAt(): ApiDocument {
        this.input.logDocument.reviewAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário mais recente que recuperou o documento da lixeira
     */
    logRestoredAt(): ApiDocument {
        this.input.logDocument.restoredAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário que iniciou progresso
     */
    logStartedAt(): ApiDocument {
        this.input.logDocument.startedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }

    /**
     * Indica a data e o usuário mais recente que enviou o documento para a lixeira
     */
    logTrashedAt(): ApiDocument {
        this.input.logDocument.trashedAt = {
            user: this.connection.auth.user,
            date: new Date()
        };
        return this;
    }
}
