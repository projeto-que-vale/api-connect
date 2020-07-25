import {JWK} from 'jose';
import RSAKey = JWK.RSAKey;

//const {JWK: {generateSync}, JWKS: {KeyStore, asKeyStore}, JWE, JWT} = require('jose');
const {JWK: {generateSync}, JWKS: {asKeyStore}, JWE, JWT} = require('jose');

//const forge = require('node-forge');
//const pki = forge.pki;


export class ApiTokenCreate {
    public metadata: any;
    public kid: string;
    public publicKey: any;
    public privateKey: any;
    public publicKeyPEM: string;
    public privateKeyPEM: string;
    public privateKeyPEMSuper: string;
    public certificate: any;

    constructor() {
        this._config();
    }

    public static isValid(token: string) {
        const key = JWK.asKey({
            kty: 'oct',
            k: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg'
        });

        try {
            const verify = JWT.verify(token, key, {
                audience: 'auth',
                issuer: 'http://localhost:4600',
                clockTolerance: '1 min'
            });
            console.log(verify);
        } catch (e) {
            console.log(e.code);
            console.log(e.name);
            console.log(e.claim);
            console.log(e.reason);
        }
    }

    public toX509(): string {

        const payload = 'aaaaaaaaaaaaaaa';
        const claims = {
            audience: ['urn:example:client'],
            issuer: 'https://op.example.com',
            expiresIn: '2 hours',
            header: {
                typ: 'JWT'
            }
        };

        const jwks = {
            'keys': [
                {
                    e: 'AQAB',
                    n: 'ubK7IET-eVeKXhAfy1JV-W1LSWqGpv0S9_CMuYYzpLK2QGvi8ULECcmOeXfW0HI6GI2eWUFMCBJKDrg5Ocj4SrUbhixHYwJUYdaYyVkQFFdiM_AlMm8KPzt7hCReT3IjHCy199dXo2vRvr608VR_1zG6PRXC3Th9eTZZsaXEQFjyGYFB9KPtJ7-p9_KO_Qy6BVNsBigBRVlfKS_NaQD2cRCD-6eJRaSYcfI0NTv5g_mLcCuHhC6awCFReXDGaqppZsBZrcIPQ7IFjvxIWB1FPoP8LxLYlLRRHVfZ3RzJejue1jLKihUw3cPa3XK2QxCLN9ok-ydVSSYg42M-MtcSBw',
                    d: 'qmRE7hRAyEi6LxtugRs4xlkyFtiHW5ymFhmElwt8Qai2MKCOKcCQr0Zh1DVRSA04H6V64f1XbaSSjbUe1VYB9lL-QXxJuKC_mtLVeROe_Hs-Idg92WwoI-NJr_PLEezyKH0iL5tJ0Csz12mYEETv1R7M_BYGqwSVpW5omOg5Dqy-F-sDMmey2GKsjtKdnUDUao-NbOX-1Pemncgv9Q7W41PlEVXzwsjpwVG2LfD84R3UnSkzWAZ_0X31394hC1FZ3wyqogfB4CHYrPTCoW_oSjpP_CsxW-bC7ywFTAZtg_2i2zg_ev8p6M6TX7ouqQ70sfQAoasMSNWbBKbryYXOoQ',
                    p: '5uBt3LAncWxSfGwJw5C96nqawMPRdOZPVUYspMPEtHmcAC013bcBVcpuKRXc0pBGSqHGHbfnBkL6DiEzgAsEJ0woozgxt-mS9zYRmuxQtWtsCHCPCpPb9gvdd3uJ683y2JZk3wpge-hbBJfvXGNlAOcYK-7Ac-RrIl5cnPiLdxc',
                    q: 'zefBpFfQWvx7KI8x8TsYEfnxMuwO0UoWiPI8jLhUTDVd7NG9KjlEeVgcUCgu4tRfn7FIX59gYwI_d6GHhNYDCDogeRlOi0fMzBHPB4aZcrfiSmZBky7GO-gbnYH1Yqmivo6qnxVEdet3l18sJbB16jCSNt8MWFu6J_yhCWnvEpE',
                    dp: 'Perii9USPvD2DjhLRg-DX2cSKbBadCdwD0aKooV-M4iJteJqF9QEn6VydcJPPolC0LEiGMZBRwSfWzq8PRK3QnLCU0O20cPqjjIJ9qp52q28g2bsdcHBs_LqqiiPjJXnEv8Cfm6iAZkHD-xPXU-qvts7OE0HgA06TjVQUSi2_nE',
                    dq: 'ZOpJRbqkK3PDCMXlvE0yJt1REZwQRxMAqG3Qr0dISXF-byr8g009-hrtBXwsPo_HrgS9a-A45U2cvY01Vi1tnwKeF7wHesvd28Z-qTmWy1rEVaJ4USKDlajUoAWptoldcfeKOB28R-731gCXKoGpyPW1M59t9YA_ZIm0g2CgA4E',
                    qi: 'cXmgd-P-LrIe-qQZ5hCayOVhQtOzZjLWrTUZYMr1NykLKHx7VlZGfm9dEUysytd1JnCkl18JJ2BgpjJyQCIjja-x8CMSUdN9ExZ3kVszDlnQhKV6VArWwef3HFp4YX3OSHydBYe33FugedvIlFWKAyDQ_iHVa5LEJP6sc41BvBg',
                    kty: 'RSA',
                    kid: 'C4kZEAjoGuKzFnP8dS8enTdPUbZJfPKIJlWZv2-shww',
                    x5c: ['MIIECTCCAvGgAwIBAgIBATANBgkqhkiG9w0BAQUFADBpMRQwEgYDVQQDEwtleGFt\n' +
                    'cGxlLm9yZzELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQH\n' +
                    'EwpCbGFja3NidXJnMQ0wCwYDVQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MB4XDTIw\n' +
                    'MDYyOTE4NTEwN1oXDTIxMDYyOTE4NTEwN1owaTEUMBIGA1UEAxMLZXhhbXBsZS5v\n' +
                    'cmcxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhWaXJnaW5pYTETMBEGA1UEBxMKQmxh\n' +
                    'Y2tzYnVyZzENMAsGA1UEChMEVGVzdDENMAsGA1UECxMEVGVzdDCCASIwDQYJKoZI\n' +
                    'hvcNAQEBBQADggEPADCCAQoCggEBALmyuyBE/nlXil4QH8tSVfltS0lqhqb9Evfw\n' +
                    'jLmGM6SytkBr4vFCxAnJjnl31tByOhiNnllBTAgSSg64OTnI+Eq1G4YsR2MCVGHW\n' +
                    'mMlZEBRXYjPwJTJvCj87e4QkXk9yIxwstffXV6Nr0b6+tPFUf9cxuj0Vwt04fXk2\n' +
                    'WbGlxEBY8hmBQfSj7Se/qffyjv0MugVTbAYoAUVZXykvzWkA9nEQg/uniUWkmHHy\n' +
                    'NDU7+YP5i3Arh4QumsAhUXlwxmqqaWbAWa3CD0OyBY78SFgdRT6D/C8S2JS0UR1X\n' +
                    '2d0cyXo7ntYyyooVMN3D2t1ytkMQizfaJPsnVUkmIONjPjLXEgcCAwEAAaOBuzCB\n' +
                    'uDAMBgNVHRMEBTADAQH/MAsGA1UdDwQEAwIC9DA7BgNVHSUENDAyBggrBgEFBQcD\n' +
                    'AQYIKwYBBQUHAwIGCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZI\n' +
                    'AYb4QgEBBAQDAgD3MCwGA1UdEQQlMCOGG2h0dHA6Ly9leGFtcGxlLm9yZy93ZWJp\n' +
                    'ZCNtZYcEfwAAATAdBgNVHQ4EFgQUvuOF478PNUMlb4Y9nXnkmSrQZA8wDQYJKoZI\n' +
                    'hvcNAQEFBQADggEBABE78QytVvpGTyUyTS0qObtLq9fZyXQeNVkmNzQHqb1Wz1Qk\n' +
                    'GicSclDRFG7yJj6G/OdNM0Fg3Ejhb7Galc3wUC7YvUQVNpVqbbC8KHiGrOVBKVBD\n' +
                    'ypmJQN3R+BfBOlVnae2ikSnTms2cfT5o7xHFgeZX8IhAhFCYfCiksS57LFx9MIhP\n' +
                    'xTZZW+auDfCNrZfMZ64B4GO+nxb8F7u7QzHHi59W8aXN5bKSaQlI0fWO8zeS5ik9\n' +
                    're+NZds/xRp9fu5gB15tyDbr4X3E1mDuEAGaZQMaESGtn1IPepa+Aw5ROQ1iczkr\n' +
                    'fSoJ+Wl0BtK6i6N3FNFEe519/S8IS3faW+Ll1nI=']
                }
            ]
        };

        const ks = asKeyStore(jwks);
        const key: RSAKey = ks.get();

        //console.log(key);

        const token = JWE.encrypt(payload, key.toJWK(), claims);

        const tokenDecrypt = JWE.decrypt(token, key.toJWK(true));
        console.log(tokenDecrypt.toString());

        return '';
    }

    private _config() {
        const rsaKey: RSAKey = generateSync('RSA', 2048, {use: 'enc'}, true);
        rsaKey.algorithms('sign');

        //console.log(rsaKey);

        this.publicKey = rsaKey.toJWK();
        this.privateKey = rsaKey.toJWK(true);
        this.publicKeyPEM = rsaKey.toPEM();
        this.privateKeyPEM = rsaKey.toPEM(true);
        this.privateKeyPEMSuper = rsaKey.toPEM(true, {passphrase: 'super-strong', cipher: 'aes-256-cbc'});
        this.kid = this.publicKey.kid;

        console.log(this.publicKeyPEM);
        console.log('sssssssssssssssssssssssssssssssss');
        console.log(this.privateKey);
        console.log('ooooooooooooooooooooooooooooooo');
        console.log(this.privateKeyPEMSuper);
        console.log('sssssssssssssssssssssssssssssssss');

        //this._cert()
    }

    /*private _cert() {
        const YEARS: number = 100;
        const publicKey = pki.publicKeyFromPem(this.publicKeyPEM);
        const privateKey = pki.privateKeyFromPem(this.privateKeyPEM);

        const cert = pki.createCertificate();
        cert.publicKey = publicKey;
        cert.serialNumber = '01';
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + YEARS);

        const attrs = [{
            name: 'commonName',
            value: process.env.CERT_COMMON_NAME
        }, {
            name: 'countryName',
            value: process.env.CERT_COUNTRY_NAME
        }, {
            name: 'stateOrProvinceName',
            value: process.env.CERT_STATE_OR_PROVINCE_NAME
        }, {
            name: 'localityName',
            value: process.env.CERT_LOCALITY_NAME
        }, {
            name: 'organizationName',
            value: process.env.CERT_ORGANIZATION_NAME
        }, {
            shortName: 'OU',
            value: process.env.CERT_ORGANIZATIONAL_UNIT_NAME
        }];

        console.log('-----------------------------------');
        console.log(attrs);
        console.log('-----------------------------------');

        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        cert.setExtensions([
            {
                name: 'basicConstraints',
                cA: true
            },
            {
                name: 'keyUsage',
                keyCertSign: true,
                digitalSignature: true,
                nonRepudiation: true,
                keyEncipherment: true,
                dataEncipherment: true
            },
            {
                name: 'extKeyUsage',
                serverAuth: true,
                clientAuth: true,
                codeSigning: true,
                emailProtection: true,
                timeStamping: true
            },
            {
                name: 'nsCertType',
                client: true,
                server: true,
                email: true,
                objsign: true,
                sslCA: true,
                emailCA: true,
                objCA: true
            }
        ]);
        cert.sign(privateKey);
        this.certificate = pki.certificateToPem(cert);
        this.privateKey.x5c = this.certificate;
    }*/
}
