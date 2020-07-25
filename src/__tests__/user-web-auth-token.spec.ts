import {ApiAuthToken} from '../security/token/api-auth-token';
import {ApiUtil} from '../api-util';
import {ApiTokenApplicationType, ApiTokenAuthContextType, ApiTokenProfileType, ApiTokenType} from '../security/token/api-token';

declare const test;
declare const expect;

let apiWebAuthToken: ApiAuthToken;

beforeAll(() => {
    apiWebAuthToken = new ApiAuthToken({
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

describe('ApiWebAuthToken', () => {
    it('Verifica o tipo de aplicação (apt)', async () => {
        expect(apiWebAuthToken.applicationType).toEqual('client');
        expect(apiWebAuthToken.applicationType).toEqual(ApiTokenApplicationType.client);
    });

    it('Verifica as configurações de audiência (aud)', async () => {
        const expected: Array<string> = ['http://localhost:4600'];
        expect(apiWebAuthToken.audience).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o contexto de autorização (ctx)', async () => {
        expect(apiWebAuthToken.authContext).toEqual(3);
        expect(apiWebAuthToken.authContext).toEqual(ApiTokenAuthContextType.normal2hours);
    });

    it('Verifica o contato do cliente (cct)', async () => {
        expect(apiWebAuthToken.clientContact).toEqual('app@veloobrasil.com.br');
    });

    it('Verifica o identificador do cliente (cid)', async () => {
        expect(apiWebAuthToken.clientId).toEqual('hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg');
    });

    it('Verifica o nome do cliente (cna)', async () => {
        expect(apiWebAuthToken.clientName).toEqual('Veloo Mobile Android');
    });

    it('Verifica a hora de emissão do token (iat)', async () => {
        const test: boolean = apiWebAuthToken.emission <= ApiUtil.createdAt();
        expect(test).toEqual(true);
    });

    it('Verifica quando o token expira (exp)', async () => {
        const test: boolean = apiWebAuthToken.expires >= apiWebAuthToken.emission;
        expect(test).toEqual(true);
    });

    it('Verifica a uri do emissor (iss)', async () => {
        expect(apiWebAuthToken.issuer).toEqual('http://localhost:4600');
    });

    it('Verifica os módulos que podem acessar (mod)', async () => {
        const expected: Array<string> = ['auth'];
        expect(apiWebAuthToken.module).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o identifcador do token (uid)', async () => {
        const test: number = apiWebAuthToken.uid.length;
        expect(test).toEqual(40);
    });

    it('Verifica o perfil do usuário (prf)', async () => {
        expect(apiWebAuthToken.profile).toEqual(2);
        expect(apiWebAuthToken.profile).toEqual(ApiTokenProfileType.userLogged2);
    });

    it('Verifica se a chave privada foi criada', async () => {
        const expected: Array<string> = ['k', 'kty', 'kid'];
        expect(Object.keys(apiWebAuthToken.privateKey)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se uma determinada ação/operação está presente no escopo de autorização (scope)', async () => {
        const regex: RegExp = new RegExp('read:cities', 'im');
        const test: boolean = regex.test(apiWebAuthToken.scope);
        expect(test).toEqual(true);
    });

    it('Verifica o assunto do token (sub)', async () => {
        expect(apiWebAuthToken.subject).toEqual('auth_token');
        expect(apiWebAuthToken.subject).toEqual(ApiTokenType.authToken);
    });

    it('Verifica a uri de requisições (uri)', async () => {
        expect(apiWebAuthToken.requestUri).toEqual('http://localhost:4600');
    });

    test('Testa o payload apt', () => {
        expect(apiWebAuthToken.payload.apt).toBe(apiWebAuthToken.applicationType);
    });

    test('Testa o payload aud', () => {
        expect(apiWebAuthToken.payload.aud).toEqual(expect.arrayContaining(apiWebAuthToken.audience));
    });

    test('Testa o payload ctx', () => {
        expect(apiWebAuthToken.payload.ctx).toBe(apiWebAuthToken.authContext);
    });

    test('Testa o payload cct', () => {
        expect(apiWebAuthToken.payload.cct).toBe(apiWebAuthToken.clientContact);
    });

    test('Testa o payload cna', () => {
        expect(apiWebAuthToken.payload.cna).toBe(apiWebAuthToken.clientName);
    });

    test('Testa o payload iat', () => {
        expect(apiWebAuthToken.payload.iat).toBe(apiWebAuthToken.emission);
    });

    test('Testa o payload exp', () => {
        expect(apiWebAuthToken.payload.exp).toBe(apiWebAuthToken.expires);
    });

    test('Testa o payload iss', () => {
        expect(apiWebAuthToken.payload.iss).toBe(apiWebAuthToken.issuer);
    });

    test('Testa o payload mod', () => {
        expect(apiWebAuthToken.payload.mod).toEqual(expect.arrayContaining(apiWebAuthToken.module));
    });

    test('Testa o payload uid', () => {
        expect(apiWebAuthToken.payload.uid).toEqual(apiWebAuthToken.uid);
    });

    test('Testa o payload prf', () => {
        expect(apiWebAuthToken.payload.prf).toEqual(apiWebAuthToken.profile);
    });

    test('Testa o payload kid', () => {
        expect(apiWebAuthToken.payload.kid).toEqual(apiWebAuthToken.privateKeyId);
    });

    test('Testa o payload role', () => {
        expect(apiWebAuthToken.payload.role).toEqual(apiWebAuthToken.role);
    });

    test('Testa o payload scope', () => {
        expect(apiWebAuthToken.payload.scope).toEqual(apiWebAuthToken.scope);
    });

    test('Testa o payload sub', () => {
        expect(apiWebAuthToken.payload.sub).toEqual(apiWebAuthToken.subject);
    });

    test('Testa o payload uri', () => {
        expect(apiWebAuthToken.payload.uri).toEqual(apiWebAuthToken.requestUri);
    });
});
