import {JWK} from 'jose';
import {ApiX509} from './api-x509';
import RSAKey = JWK.RSAKey;
//import OctKey = JWK.OctKey;

//const {JWK: {generateSync}, JWT, JWKS: {KeyStore, asKeyStore}, JWE} = require('jose');
const {JWK: {generateSync}, JWKS: {asKeyStore}, JWE} = require('jose');

/*
{
        "type": "service_account",
        "project_id": "veloo-entregadores",
        "private_key_id": "d39fdf859f13853f28bbc875b8cd005ff1f76c8c",
        "private_key": "-----BEGIN PRIVATE KEY----------END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-5t5dv@veloo-entregadores.iam.gserviceaccount.com",
        "client_id": "102501218726582297962",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5t5dv%40veloo-entregadores.iam.gserviceaccount.com"
}
*/

export class ApiRsa {
    public clientMetadata: any = {
        public: {},
        private: {},
    };
    public serverMetadata: any = {
        public: {},
        private: {},
    };

    public certificates: any = {
        public: {},
        private: {}
    };
    public modules: any = {
        public: '',
        private: ''
    };

    constructor() {
        this._create();
    }

    public static JWEencode(JWKpublicKey: any, x509: string, module: any, payload: string): string {
        JWKpublicKey.n = module.n;
        const match:any = x509.match(/-----BEGIN\sCERTIFICATE-----([\s\S]*?)-----END\sCERTIFICATE-----/im);
        x509 = (match[1]).replace(/\n/ig,'');
        JWKpublicKey.x5c = [x509];
        const claims = {
            audience: ['urn:example:client'],
            issuer: 'https://op.example.com',
            expiresIn: '20 m',
            header: {
                typ: 'JWT'
            }
        };
        const jwks = {'keys': [JWKpublicKey]};
        const ks = asKeyStore(jwks);
        const key: RSAKey = ks.get();
        return JWE.encrypt(payload, key.toJWK(), claims);
    }

    public static JWEdecode(JWKprivateKey: any, x509: string, module: any, token: string): string {
        JWKprivateKey.n = module.n;
        const match:any = x509.match(/-----BEGIN\sCERTIFICATE-----([\s\S]*?)-----END\sCERTIFICATE-----/im);
        x509 = (match[1]).replace(/\n/ig,'');
        JWKprivateKey.x5c = [x509];
        const jwks = {'keys': [JWKprivateKey]};
        const ks = asKeyStore(jwks);
        const key: RSAKey = ks.get();
        const tokenDecrypt = JWE.decrypt(token, key.toJWK(true));
        return tokenDecrypt.toString();
    }

    /*private static createJWT(value: any, subject: any) {

        const oct: OctKey = generateSync('oct', 512, {use: 'sig'}, true);
        //rsaPrivateKey.algorithms('sign');

        console.log('oct--->>>', oct);
        console.log('oct--->>>', oct.toJWK());
        console.log('oct--->>>', oct.toJWK(true));

        console.log(value);

        const key = JWK.asKey(value);

        const time = new Date();
        const outraData = new Date();
        //outraData.setHours(time.getMinutes() + 1); // Adiciona 2 horas

        const payload = {
            'iss': 'http://localhost:4600/', //Identificação do emissor
            'sub': subject, // Assunto
            'aud': 'application', // Identificação do cliente, server (servidor), app (aplicação), user (usuário)
            'jti': value.kid
        };

        const token = JWT.sign(payload, key, {
            audience: ['urn:example:client'],
            issuer: 'https://op.example.com',
            //expiresIn: '20 y',
            header: {
                typ: 'JWT'
            }
        });

        console.log(token);
        try {
            const verify = JWT.verify(token, key, {
                audience: 'urn:example:client',
                issuer: 'https://op.example.com',
                clockTolerance: '1 min'
            });
            //console.log(verify);
        } catch (e) {
            console.log(e.code);
            console.log(e.name);
            console.log(e.claim);
            console.log(e.reason);
        }

        const decode = JWT.decode(token);
//console.log(decode);

        const decodeComplete = JWT.decode(token, {complete: true});
        console.log(decodeComplete);
    }*/

    private _create(): void {
        const rsaPublic: RSAKey = generateSync('RSA', 2048, {use: 'enc'}, true);
        rsaPublic.algorithms('sign');
        const rsaPrivate: RSAKey = generateSync('RSA', 2048, {use: 'enc'}, true);
        rsaPublic.algorithms('sign');

        this.clientMetadata.public = rsaPublic.toJWK();
        this.clientMetadata.private = rsaPrivate.toJWK(true);

        this.serverMetadata.public = rsaPrivate.toJWK();
        this.serverMetadata.private = rsaPublic.toJWK(true);

        const publicKeyId: string = this.clientMetadata.public['kid'];
        const privateKeyId: string = this.clientMetadata.private['kid'];

        this.modules.public = {
            moduleId: publicKeyId,
            n: this.clientMetadata.public['n']
        };
        delete (this.clientMetadata.public['n']);
        delete (this.clientMetadata.private['n']);

        this.certificates.public = {
            moduleId: publicKeyId,
            x509: ApiX509.create(rsaPublic.toPEM(), rsaPublic.toPEM(true))
        };

        this.modules.private = {
            moduleId: privateKeyId,
            n: this.serverMetadata.public['n']
        };
        delete (this.serverMetadata.public['n']);
        delete (this.serverMetadata.private['n']);

        this.certificates.private = {
            moduleId: privateKeyId,
            x509: ApiX509.create(rsaPrivate.toPEM(), rsaPrivate.toPEM(true))
        };

        console.log('this.clientMetadata', this.clientMetadata);
        console.log('this.serverMetadata', this.serverMetadata);
        console.log('this.modules', this.modules);
        console.log('this.certificates', this.certificates);

        const token: string = ApiRsa.JWEencode(this.clientMetadata.public, this.certificates.public.x509, this.modules.public, 'aaaaaaaaaaaaaaaXXX');

        console.log(token);


        const value: string = ApiRsa.JWEdecode(this.serverMetadata.private, this.certificates.public.x509, this.modules.public, token);
        console.log(value);

        //this.createJWT(oct.toJWK(true), JSON.stringify(rsaKey.publicMetadata));
    }
}
