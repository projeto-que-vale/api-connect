import {ApiUtil} from '../api-util';
import {ApiAccessToken} from '../security/token/api-access-token';
import {
    ApiTokenAccessLevelType,
    ApiTokenApplicationType,
    ApiTokenAuthContextType,
    ApiTokenProfileType,
    ApiTokenType
} from '../security/token/api-token';

declare const test;
declare const expect;

let apiWebAccessToken: ApiAccessToken;

beforeAll(() => {
    apiWebAccessToken = new ApiAccessToken({
        clientContact: 'app@veloobrasil.com.br',
        audience: ['http://localhost:4600'],
        applicationType: ApiTokenApplicationType.client,
        clientId: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg',
        clientName: 'Veloo API',
        authContext: ApiTokenAuthContextType.normal2hours,
        issuer: 'http://localhost:4600',
        module: ['auth', 'city', 'mala'],
        scope: 'create:cityCreate read:city read:cities update:cityEdit delete:cityRemove create:authorize',
        profile: ApiTokenProfileType.userLogged2,
        role: {_id: 's8dfsd8f7s8d97f8sdf7', acl: ApiTokenAccessLevelType.admin},
        requestUri: 'http://localhost:4600'
    });
});

describe('ApiWebAccessToken', () => {
    it('Verifica o tipo de aplicação (apt)', async () => {
        expect(apiWebAccessToken.applicationType).toEqual('client');
        expect(apiWebAccessToken.applicationType).toEqual(ApiTokenApplicationType.client);
    });

    it('Verifica as configurações de audiência (aud)', async () => {
        const expected: Array<string> = ['http://localhost:4600'];
        expect(apiWebAccessToken.audience).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o contexto de autorização (ctx)', async () => {
        expect(apiWebAccessToken.authContext).toEqual(3);
        expect(apiWebAccessToken.authContext).toEqual(ApiTokenAuthContextType.normal2hours);
    });

    it('Verifica o contato do cliente (cct)', async () => {
        expect(apiWebAccessToken.clientContact).toEqual('app@veloobrasil.com.br');
    });

    it('Verifica o identificador do cliente (cid)', async () => {
        expect(apiWebAccessToken.clientId).toEqual('hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg');
    });

    it('Verifica o nome do cliente (cna)', async () => {
        expect(apiWebAccessToken.clientName).toEqual('Veloo API');
    });

    it('Verifica a hora de emissão do token (iat)', async () => {
        const test: boolean = apiWebAccessToken.emission <= ApiUtil.createdAt();
        expect(test).toEqual(true);
    });

    it('Verifica quando o token expira (exp)', async () => {
        const test: boolean = apiWebAccessToken.expires >= apiWebAccessToken.emission;
        expect(test).toEqual(true);
    });

    it('Verifica a uri do emissor (iss)', async () => {
        expect(apiWebAccessToken.issuer).toEqual('http://localhost:4600');
    });

    it('Verifica os módulos que podem acessar (mod)', async () => {
        const expected: Array<string> = ['auth', 'city'];
        expect(apiWebAccessToken.module).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o identifcador do token (uid)', async () => {
        const test: number = apiWebAccessToken.uid.length;
        expect(test).toEqual(40);
    });

    it('Verifica o perfil do usuário (prf)', async () => {
        expect(apiWebAccessToken.profile).toEqual(2);
        expect(apiWebAccessToken.profile).toEqual(ApiTokenProfileType.userLogged2);
    });

    it('Verifica se a chave privada foi criada', async () => {
        const expected: Array<string> = ['k', 'kty', 'kid'];
        expect(Object.keys(apiWebAccessToken.privateKey)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se foi definido papel de usuário (role)', async () => {
        const expected: Array<string> = ['_id', 'acl'];
        expect(Object.keys(apiWebAccessToken.role)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se uma determinada ação/operação está presente no escopo de autorização (scope)', async () => {
        const regex: RegExp = new RegExp('read:cities', 'im');
        const test: boolean = regex.test(apiWebAccessToken.scope);
        expect(test).toEqual(true);
    });

    it('Verifica o assunto do token (sub)', async () => {
        expect(apiWebAccessToken.subject).toEqual('access_token');
        expect(apiWebAccessToken.subject).toEqual(ApiTokenType.accessToken);
    });

    it('Verifica a uri de requisições (uri)', async () => {
        expect(apiWebAccessToken.requestUri).toEqual('http://localhost:4600');
    });

    test('Testa o payload apt', () => {
        expect(apiWebAccessToken.payload.apt).toBe(apiWebAccessToken.applicationType);
    });

    test('Testa o payload aud', () => {
        expect(apiWebAccessToken.payload.aud).toEqual(expect.arrayContaining(apiWebAccessToken.audience));
    });

    test('Testa o payload ctx', () => {
        expect(apiWebAccessToken.payload.ctx).toBe(apiWebAccessToken.authContext);
    });

    test('Testa o payload cct', () => {
        expect(apiWebAccessToken.payload.cct).toBe(apiWebAccessToken.clientContact);
    });

    test('Testa o payload cna', () => {
        expect(apiWebAccessToken.payload.cna).toBe(apiWebAccessToken.clientName);
    });

    test('Testa o payload iat', () => {
        expect(apiWebAccessToken.payload.iat).toBe(apiWebAccessToken.emission);
    });

    test('Testa o payload exp', () => {
        expect(apiWebAccessToken.payload.exp).toBe(apiWebAccessToken.expires);
    });

    test('Testa o payload iss', () => {
        expect(apiWebAccessToken.payload.iss).toBe(apiWebAccessToken.issuer);
    });

    test('Testa o payload mod', () => {
        expect(apiWebAccessToken.payload.mod).toEqual(expect.arrayContaining(apiWebAccessToken.module));
    });

    test('Testa o payload uid', () => {
        expect(apiWebAccessToken.payload.uid).toEqual(apiWebAccessToken.uid);
    });

    test('Testa o payload prf', () => {
        expect(apiWebAccessToken.payload.prf).toEqual(apiWebAccessToken.profile);
    });

    test('Testa o payload kid', () => {
        expect(apiWebAccessToken.payload.kid).toEqual(apiWebAccessToken.privateKeyId);
    });

    test('Testa o payload role', () => {
        expect(apiWebAccessToken.payload.role).toEqual(apiWebAccessToken.role);
    });

    test('Testa o payload scope', () => {
        expect(apiWebAccessToken.payload.scope).toEqual(apiWebAccessToken.scope);
    });

    test('Testa o payload sub', () => {
        expect(apiWebAccessToken.payload.sub).toEqual(apiWebAccessToken.subject);
    });

    test('Testa o payload uri', () => {
        expect(apiWebAccessToken.payload.uri).toEqual(apiWebAccessToken.requestUri);
    });
});
