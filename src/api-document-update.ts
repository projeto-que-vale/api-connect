export class ApiDocumentUpdate {
    constructor(public collection: string, public input: any, public connection: any) {
    }

    get value() {
        return this.input;
    }

    /**
     * Indica a data e o usuário que aprovou o documento
     */
    logApprovedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.approvedAt'] = value;

        value.action = 'Aprovou o documento';
        value.event = 'approvedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que aprovou o documento
     */
    //TODO:: Implementar identificação do usuário
    logChangedAt(message: string): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.changedAt'] = value;

        value.action = message;
        value.event = 'changedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que fechou o documento
     */
    logClosedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.closedAt'] = value;

        value.action = 'Fechou o documento';
        value.event = 'closedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário deletou o documento
     */
    logDeletedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.deletedAt'] = value;

        value.action = 'Deletou permanentemente o documento';
        value.event = 'deletedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário mais recente que desabilitou o documento
     */
    logDisabledAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.disabledAt'] = value;

        value.action = 'Desabilitou o documento';
        value.event = 'disabledAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário mais recente que alterou o documento
     */
    logEnabledAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.enabledAt'] = value;

        value.action = 'Habilitou o documento';
        value.event = 'enabledAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica que foi concluído
     */
    logEndedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.endedAt'] = value;

        value.action = 'Finalizou o documento';
        value.event = 'endedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que abriu o documento
     */
    logOpenedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.openedAt'] = value;

        value.action = 'Abriu o documento';
        value.event = 'openedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que pausou o progresso
     */
    logPausedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.pausedAt'] = value;

        value.action = 'Pausou o documento';
        value.event = 'pausedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que rejeitou o documento
     */
    logRejectedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.rejectedAt'] = value;

        value.action = 'Rejeitou o documento';
        value.event = 'rejectedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que reabriu o documento
     */
    logReopenedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.reopenedAt'] = value;

        value.action = 'Reabriu o documento';
        value.event = 'reopenedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que o documento entrou em revisão
     */
    logReviewAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.reviewAt'] = value;

        value.action = 'Revisou o documento';
        value.event = 'reviewAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário mais recente que recuperou o documento da lixeira
     */
    logRestoredAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.restoredAt'] = value;

        value.action = 'Restaurou o documento';
        value.event = 'restoredAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário que iniciou progresso
     */
    logStartedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.startedAt'] = value;

        value.action = 'Iniciou o documento';
        value.event = 'startedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e o usuário mais recente que enviou o documento para a lixeira
     */
    logTrashedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.trashedAt'] = value;

        value.action = 'Removeu o documento';
        value.event = 'trashedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }

    /**
     * Indica a data e horário que o usuário visualizou o documento
     */
    logViewedAt(): ApiDocumentUpdate {
        const value: any = {
            user: this.connection.auth.user,
            date: new Date()
        };
        this.input['$set']['logDocument.viewedAt'] = value;

        value.action = 'Visualizou o documento';
        value.event = 'viewedAt';
        this.input['$push'] = {'_info.history': value};

        return this;
    }
}
