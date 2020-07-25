const forge = require('node-forge');
const pki = forge.pki;


export class ApiX509 {
    public static create(PEMpublicKey: string, PEMprivateKey: string): string {
        const publicKey = pki.publicKeyFromPem(PEMpublicKey);
        const privateKey = pki.privateKeyFromPem(PEMprivateKey);
        const cert = pki.createCertificate();
        const YEARS: number = 100;

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
        const certificate = pki.certificateToPem(cert);
        return certificate.replace(/\r/ig,'');
    }
}
