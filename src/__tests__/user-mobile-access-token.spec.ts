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

let apiMobileAccessToken: ApiAccessToken;

beforeAll(() => {
    apiMobileAccessToken = new ApiAccessToken({
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

describe('ApiMobileAccessToken', () => {
    it('Verifica o tipo de aplicação (apt)', async () => {
        expect(apiMobileAccessToken.applicationType).toEqual('client');
        expect(apiMobileAccessToken.applicationType).toEqual(ApiTokenApplicationType.client);
    });

    it('Verifica as configurações de audiência (aud)', async () => {
        const expected: Array<string> = ['http://localhost:4600'];
        expect(apiMobileAccessToken.audience).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o contexto de autorização (ctx)', async () => {
        expect(apiMobileAccessToken.authContext).toEqual(3);
        expect(apiMobileAccessToken.authContext).toEqual(ApiTokenAuthContextType.normal2hours);
    });

    it('Verifica o contato do cliente (cct)', async () => {
        expect(apiMobileAccessToken.clientContact).toEqual('app@veloobrasil.com.br');
    });

    it('Verifica o identificador do cliente (cid)', async () => {
        expect(apiMobileAccessToken.clientId).toEqual('hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg');
    });

    it('Verifica o nome do cliente (cna)', async () => {
        expect(apiMobileAccessToken.clientName).toEqual('Veloo API');
    });

    it('Verifica a hora de emissão do token (iat)', async () => {
        const test: boolean = apiMobileAccessToken.emission <= ApiUtil.createdAt();
        expect(test).toEqual(true);
    });

    it('Verifica quando o token expira (exp)', async () => {
        const test: boolean = apiMobileAccessToken.expires >= apiMobileAccessToken.emission;
        expect(test).toEqual(true);
    });

    it('Verifica a uri do emissor (iss)', async () => {
        expect(apiMobileAccessToken.issuer).toEqual('http://localhost:4600');
    });

    it('Verifica os módulos que podem acessar (mod)', async () => {
        const expected: Array<string> = ['auth', 'city'];
        expect(apiMobileAccessToken.module).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o identifcador do token (uid)', async () => {
        const test: number = apiMobileAccessToken.uid.length;
        expect(test).toEqual(40);
    });

    it('Verifica o perfil do usuário (prf)', async () => {
        expect(apiMobileAccessToken.profile).toEqual(2);
        expect(apiMobileAccessToken.profile).toEqual(ApiTokenProfileType.userLogged2);
    });

    it('Verifica se a chave privada foi criada', async () => {
        const expected: Array<string> = ['k', 'kty', 'kid'];
        expect(Object.keys(apiMobileAccessToken.privateKey)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se foi definido papel de usuário (role)', async () => {
        const expected: Array<string> = ['_id', 'acl'];
        expect(Object.keys(apiMobileAccessToken.role)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se uma determinada ação/operação está presente no escopo de autorização (scope)', async () => {
        const regex: RegExp = new RegExp('read:cities', 'im');
        const test: boolean = regex.test(apiMobileAccessToken.scope);
        expect(test).toEqual(true);
    });

    it('Verifica o assunto do token (sub)', async () => {
        expect(apiMobileAccessToken.subject).toEqual('access_token');
        expect(apiMobileAccessToken.subject).toEqual(ApiTokenType.accessToken);
    });

    it('Verifica a uri de requisições (uri)', async () => {
        expect(apiMobileAccessToken.requestUri).toEqual('http://localhost:4600');
    });

    test('Testa o payload apt', () => {
        expect(apiMobileAccessToken.payload.apt).toBe(apiMobileAccessToken.applicationType);
    });

    test('Testa o payload aud', () => {
        expect(apiMobileAccessToken.payload.aud).toEqual(expect.arrayContaining(apiMobileAccessToken.audience));
    });

    test('Testa o payload ctx', () => {
        expect(apiMobileAccessToken.payload.ctx).toBe(apiMobileAccessToken.authContext);
    });

    test('Testa o payload cct', () => {
        expect(apiMobileAccessToken.payload.cct).toBe(apiMobileAccessToken.clientContact);
    });

    test('Testa o payload cna', () => {
        expect(apiMobileAccessToken.payload.cna).toBe(apiMobileAccessToken.clientName);
    });

    test('Testa o payload iat', () => {
        expect(apiMobileAccessToken.payload.iat).toBe(apiMobileAccessToken.emission);
    });

    test('Testa o payload exp', () => {
        expect(apiMobileAccessToken.payload.exp).toBe(apiMobileAccessToken.expires);
    });

    test('Testa o payload iss', () => {
        expect(apiMobileAccessToken.payload.iss).toBe(apiMobileAccessToken.issuer);
    });

    test('Testa o payload mod', () => {
        expect(apiMobileAccessToken.payload.mod).toEqual(expect.arrayContaining(apiMobileAccessToken.module));
    });

    test('Testa o payload uid', () => {
        expect(apiMobileAccessToken.payload.uid).toEqual(apiMobileAccessToken.uid);
    });

    test('Testa o payload prf', () => {
        expect(apiMobileAccessToken.payload.prf).toEqual(apiMobileAccessToken.profile);
    });

    test('Testa o payload kid', () => {
        expect(apiMobileAccessToken.payload.kid).toEqual(apiMobileAccessToken.privateKeyId);
    });

    test('Testa o payload role', () => {
        expect(apiMobileAccessToken.payload.role).toEqual(apiMobileAccessToken.role);
    });

    test('Testa o payload scope', () => {
        expect(apiMobileAccessToken.payload.scope).toEqual(apiMobileAccessToken.scope);
    });

    test('Testa o payload sub', () => {
        expect(apiMobileAccessToken.payload.sub).toEqual(apiMobileAccessToken.subject);
    });

    test('Testa o payload uri', () => {
        expect(apiMobileAccessToken.payload.uri).toEqual(apiMobileAccessToken.requestUri);
    });
});
