declare const require;
const ObjectID = require('mongodb').ObjectID;
const forge = require('node-forge');
//const rsa = forge.pki.rsa;
//const pki = forge.pki;

export class ApiSecurity {
    private static _instance: ApiSecurity = new ApiSecurity();

    constructor() {
        if (ApiSecurity._instance) {
            throw new Error('Error: Instantiation failed: Use Security.method() static.');
        }
    }

    public static get nonce(): string {
        return this.md5(this.randomBytes(32));
    }

    /**
     * Gera um identificador similar no formato mongodb objectId
     */
    public static objectId(id?: string): any {
        if (id !== 'undefined' && (typeof id === 'string')) {
            return new ObjectID(id.trim());
        } else if (id === undefined || id === 'undefined' || (id === null)) {
            return new ObjectID();
        } else {
            console.error('Error Security.objectId: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters::', id);
        }
    }

    /**
     * Gera um identificador de 8 digitos
     */
    public static shortId(): string {
        const value: string = this.randomBytes(40);
        const hash = this.sha1(value);
        return 's' + hash.substr(0, 1) + hash.substr(3, 1) + hash.substr(7, 1) + hash.substr(11, 1) + hash.substr(15, 1) +
                hash.substr(19, 1) + hash.substr(23, 1) + hash.substr(27, 1) + hash.substr(31, 1);
    }

    public static md5(value: string): string {
        const md = forge.md.md5.create();
        md.update(value);
        return md.digest().toHex();
    }

    public static sha1(value: string): string {
        const md = forge.md.sha1.create();
        md.update(value);
        return md.digest().toHex();
    }

    /**
     * Gera verificador de integrdade de documento
     * @param data
     */
    public static checksum(data: any): string {
        if (typeof data === 'object') {
            data = (JSON.stringify(data)).replace(/\s/, '').toLowerCase();
        }
        return this.sha1(data);
    }

    public static randomBytes(length: number): string {
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    public static base64URLEncode(value: string): string {
        return forge.util.encode64(value)
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
    }

    public static sha256(value: string): string {
        const md = forge.md.sha256.create();
        md.update(value);
        return md.digest().toHex();
    }

    /**
     * Gerador de senha seguras
     */
    public static generatePassword(passwordLenght: number = 16, lowercase: boolean = true, uppercase: boolean = true, numbers: boolean = true, symbols: boolean = true): string {

        if (!lowercase && !uppercase && !numbers && !symbols) {
            return '...';
        }

        // Create array from chosen checkboxes
        const dictionary: Array<string> = [].concat(
                // @ts-ignore
                lowercase ? ('abcdefghijklmnopqrstuvwxyz').split('') : [],
                uppercase ? ('ABCDEFGHIJKLMNOPWRSTUVWXYZ').split('') : [],
                numbers ? ('0123456789').split('') : [],
                symbols ? ('!@#$%^&*-_=+\\|:;\',.\<>/?~').split('') : []
        );

        // Generate random password from array
        let newPassword: string = '';
        for (let i = 0; i < passwordLenght; i++) {
            newPassword += dictionary[Math.floor(Math.random() * dictionary.length)];
        }
        return newPassword;
    }
}
