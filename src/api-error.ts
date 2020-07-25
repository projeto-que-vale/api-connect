export class ApiError {
    errors: Array<{ code: string; message: string; path?: string; }> = [];

    public get hasErrors(): boolean {
        return this.errors.length > 0;
    }

    public add(code: string, message: string, path?: string) {
        this.errors.push({path, code, message});
    }
}
