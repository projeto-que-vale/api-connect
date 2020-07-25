const now = require('performance-now');


export class ApiMetric {
    _lifeCycle: any = {
        request: 0,
        parsing: 0,
        validation: 0,
        execution: 0,
        response: 0,
        externalService: 0,
        dataBase: 0
    };

    startTime: number = now();

    get request(): string {
        const currentTime: string = (now() - this.startTime).toFixed(3);
        this._lifeCycle.request = parseFloat(currentTime);
        return currentTime;
    }

    get parsing(): string {
        const currentTime: string = (now() - this.startTime).toFixed(3);
        this._lifeCycle.parsing = parseFloat(currentTime);
        return currentTime;
    }

    get validation(): string {
        const currentTime: string = (now() - this.startTime).toFixed(3);
        this._lifeCycle.validation = parseFloat(currentTime);
        return currentTime;
    }

    get execution(): string {
        const currentTime: string = (now() - this.startTime).toFixed(3);
        this._lifeCycle.execution = parseFloat(currentTime);
        return currentTime;
    }

    get response(): string {
        this._lifeCycle.response = parseFloat((now() - this.startTime).toFixed(3));
        return this._lifeCycle.response;
    }

    get externalService(): string {
        const currentTime: string = (now() - this.startTime).toFixed(3);
        this._lifeCycle.externalService = parseFloat(currentTime);
        return currentTime;
    }

    get dataBase(): string {
        const currentTime: string = (now() - this.startTime).toFixed(3);
        this._lifeCycle.dataBase = parseFloat(currentTime);
        return currentTime;
    }

    get value(): any {
        return this._lifeCycle
    }
}
