import {ApiAuthToken} from '../security/token/api-auth-token';
import {
} from '../security/token/api-token.abstract';
import {ApiUtil} from '../api-util';
import {
    ApiTokenApplicationType,
    ApiTokenAuthContextType,
    ApiTokenProfileType,
    ApiTokenType
} from '../security/token/api-token';


declare const test;
declare const expect;

let apiMobileAuthToken: ApiAuthToken;

beforeAll(() => {
    apiMobileAuthToken = new ApiAuthToken({
        clientContact: 'app@veloobrasil.com.br',
        audience: ['http://localhost:4600'],
        applicationType: ApiTokenApplicationType.client,
        clientId: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg',
        clientName: 'Veloo Mobile Android',
        authContext: ApiTokenAuthContextType.normal2hours,
        issuer: 'http://localhost:4600',
        module: ['auth'],
        scope: 'create:cityCreate read:city read:cities update:cityEdit delete:cityRemove create:authorize',
        profile: ApiTokenProfileType.userLogged2,
        requestUri: 'http://localhost:4600'
    });
});

describe('ApiMobileAuthToken', () => {
    it('Verifica o tipo de aplicação (apt)', async () => {
        expect(apiMobileAuthToken.applicationType).toEqual('client');
        expect(apiMobileAuthToken.applicationType).toEqual(ApiTokenApplicationType.client);
    });

    it('Verifica as configurações de audiência (aud)', async () => {
        const expected: Array<string> = ['http://localhost:4600'];
        expect(apiMobileAuthToken.audience).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o contexto de autorização (ctx)', async () => {
        expect(apiMobileAuthToken.authContext).toEqual(3);
        expect(apiMobileAuthToken.authContext).toEqual(ApiTokenAuthContextType.normal2hours);
    });

    it('Verifica o contato do cliente (cct)', async () => {
        expect(apiMobileAuthToken.clientContact).toEqual('app@veloobrasil.com.br');
    });

    it('Verifica o identificador do cliente (cid)', async () => {
        expect(apiMobileAuthToken.clientId).toEqual('hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg');
    });

    it('Verifica o nome do cliente (cna)', async () => {
        expect(apiMobileAuthToken.clientName).toEqual('Veloo Mobile Android');
    });

    it('Verifica a hora de emissão do token (iat)', async () => {
        const test: boolean = apiMobileAuthToken.emission <= ApiUtil.createdAt();
        expect(test).toEqual(true);
    });

    it('Verifica quando o token expira (exp)', async () => {
        const test: boolean = apiMobileAuthToken.expires >= apiMobileAuthToken.emission;
        expect(test).toEqual(true);
    });

    it('Verifica a uri do emissor (iss)', async () => {
        expect(apiMobileAuthToken.issuer).toEqual('http://localhost:4600');
    });

    it('Verifica os módulos que podem acessar (mod)', async () => {
        const expected: Array<string> = ['auth'];
        expect(apiMobileAuthToken.module).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o identifcador do token (uid)', async () => {
        const test: number = apiMobileAuthToken.uid.length;
        expect(test).toEqual(40);
    });

    it('Verifica o perfil do usuário (prf)', async () => {
        expect(apiMobileAuthToken.profile).toEqual(2);
        expect(apiMobileAuthToken.profile).toEqual(ApiTokenProfileType.userLogged2);
    });

    it('Verifica se a chave privada foi criada', async () => {
        const expected: Array<string> = ['k', 'kty', 'kid'];
        expect(Object.keys(apiMobileAuthToken.privateKey)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se uma determinada ação/operação está presente no escopo de autorização (scope)', async () => {
        const regex: RegExp = new RegExp('read:cities', 'im');
        const test: boolean = regex.test(apiMobileAuthToken.scope);
        expect(test).toEqual(true);
    });

    it('Verifica o assunto do token (sub)', async () => {
        expect(apiMobileAuthToken.subject).toEqual('auth_token');
        expect(apiMobileAuthToken.subject).toEqual(ApiTokenType.authToken);
    });

    it('Verifica a uri de requisições (uri)', async () => {
        expect(apiMobileAuthToken.requestUri).toEqual('http://localhost:4600');
    });

    test('Testa o payload apt', () => {
        expect(apiMobileAuthToken.payload.apt).toBe(apiMobileAuthToken.applicationType);
    });

    test('Testa o payload aud', () => {
        expect(apiMobileAuthToken.payload.aud).toEqual(expect.arrayContaining(apiMobileAuthToken.audience));
    });

    test('Testa o payload ctx', () => {
        expect(apiMobileAuthToken.payload.ctx).toBe(apiMobileAuthToken.authContext);
    });

    test('Testa o payload cct', () => {
        expect(apiMobileAuthToken.payload.cct).toBe(apiMobileAuthToken.clientContact);
    });

    test('Testa o payload cna', () => {
        expect(apiMobileAuthToken.payload.cna).toBe(apiMobileAuthToken.clientName);
    });

    test('Testa o payload iat', () => {
        expect(apiMobileAuthToken.payload.iat).toBe(apiMobileAuthToken.emission);
    });

    test('Testa o payload exp', () => {
        expect(apiMobileAuthToken.payload.exp).toBe(apiMobileAuthToken.expires);
    });

    test('Testa o payload iss', () => {
        expect(apiMobileAuthToken.payload.iss).toBe(apiMobileAuthToken.issuer);
    });

    test('Testa o payload mod', () => {
        expect(apiMobileAuthToken.payload.mod).toEqual(expect.arrayContaining(apiMobileAuthToken.module));
    });

    test('Testa o payload uid', () => {
        expect(apiMobileAuthToken.payload.uid).toEqual(apiMobileAuthToken.uid);
    });

    test('Testa o payload prf', () => {
        expect(apiMobileAuthToken.payload.prf).toEqual(apiMobileAuthToken.profile);
    });

    test('Testa o payload kid', () => {
        expect(apiMobileAuthToken.payload.kid).toEqual(apiMobileAuthToken.privateKeyId);
    });

    test('Testa o payload role', () => {
        expect(apiMobileAuthToken.payload.role).toEqual(apiMobileAuthToken.role);
    });

    test('Testa o payload scope', () => {
        expect(apiMobileAuthToken.payload.scope).toEqual(apiMobileAuthToken.scope);
    });

    test('Testa o payload sub', () => {
        expect(apiMobileAuthToken.payload.sub).toEqual(apiMobileAuthToken.subject);
    });

    test('Testa o payload uri', () => {
        expect(apiMobileAuthToken.payload.uri).toEqual(apiMobileAuthToken.requestUri);
    });
});
