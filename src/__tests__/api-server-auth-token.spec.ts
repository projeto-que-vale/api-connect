import {ApiAuthToken} from '../security/token/api-auth-token';
import {
} from '../security/token/api-token.abstract';
import {ApiUtil} from '../api-util';
import {
    ApiTokenAccessLevelType,
    ApiTokenApplicationType,
    ApiTokenAuthContextType,
    ApiTokenProfileType,
    ApiTokenType
} from '../security/token/api-token';


declare const test;
declare const expect;

let apiServerAuthToken: ApiAuthToken;

beforeAll(() => {
    apiServerAuthToken = new ApiAuthToken({
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

describe('ApiServerAuthToken', () => {
    it('Verifica o tipo de aplicação (apt)', async () => {
        expect(apiServerAuthToken.applicationType).toEqual('client');
        expect(apiServerAuthToken.applicationType).toEqual(ApiTokenApplicationType.client);
    });

    it('Verifica as configurações de audiência (aud)', async () => {
        const expected: Array<string> = ['http://localhost:4600'];
        expect(apiServerAuthToken.audience).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o contexto de autorização (ctx)', async () => {
        expect(apiServerAuthToken.authContext).toEqual(3);
        expect(apiServerAuthToken.authContext).toEqual(ApiTokenAuthContextType.normal2hours);
    });

    it('Verifica o contato do cliente (cct)', async () => {
        expect(apiServerAuthToken.clientContact).toEqual('app@veloobrasil.com.br');
    });

    it('Verifica o identificador do cliente (cid)', async () => {
        expect(apiServerAuthToken.clientId).toEqual('hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg');
    });

    it('Verifica o nome do cliente (cna)', async () => {
        expect(apiServerAuthToken.clientName).toEqual('Veloo API');
    });

    it('Verifica a hora de emissão do token (iat)', async () => {
        const test: boolean = apiServerAuthToken.emission <= ApiUtil.createdAt();
        expect(test).toEqual(true);
    });

    it('Verifica quando o token expira (exp)', async () => {
        const test: boolean = apiServerAuthToken.expires >= apiServerAuthToken.emission;
        expect(test).toEqual(true);
    });

    it('Verifica a uri do emissor (iss)', async () => {
        expect(apiServerAuthToken.issuer).toEqual('http://localhost:4600');
    });

    it('Verifica os módulos que podem acessar (mod)', async () => {
        const expected: Array<string> = ['auth', 'city'];
        expect(apiServerAuthToken.module).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o identifcador do token (uid)', async () => {
        const test: number = apiServerAuthToken.uid.length;
        expect(test).toEqual(40);
    });

    it('Verifica o perfil do usuário (prf)', async () => {
        expect(apiServerAuthToken.profile).toEqual(2);
        expect(apiServerAuthToken.profile).toEqual(ApiTokenProfileType.userLogged2);
    });

    it('Verifica se a chave privada foi criada', async () => {
        const expected: Array<string> = ['k', 'kty', 'kid'];
        expect(Object.keys(apiServerAuthToken.privateKey)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se foi definido papel de usuário (role)', async () => {
        const expected: Array<string> = ['_id', 'acl'];
        expect(Object.keys(apiServerAuthToken.role)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se uma determinada ação/operação está presente no escopo de autorização (scope)', async () => {
        const regex: RegExp = new RegExp('read:cities', 'im');
        const test: boolean = regex.test(apiServerAuthToken.scope);
        expect(test).toEqual(true);
    });

    it('Verifica o assunto do token (sub)', async () => {
        expect(apiServerAuthToken.subject).toEqual('auth_token');
        expect(apiServerAuthToken.subject).toEqual(ApiTokenType.authToken);
    });

    it('Verifica a uri de requisições (uri)', async () => {
        expect(apiServerAuthToken.requestUri).toEqual('http://localhost:4600');
    });

    test('Testa o payload apt', () => {
        expect(apiServerAuthToken.payload.apt).toBe(apiServerAuthToken.applicationType);
    });

    test('Testa o payload aud', () => {
        expect(apiServerAuthToken.payload.aud).toEqual(expect.arrayContaining(apiServerAuthToken.audience));
    });

    test('Testa o payload ctx', () => {
        expect(apiServerAuthToken.payload.ctx).toBe(apiServerAuthToken.authContext);
    });

    test('Testa o payload cct', () => {
        expect(apiServerAuthToken.payload.cct).toBe(apiServerAuthToken.clientContact);
    });

    test('Testa o payload cna', () => {
        expect(apiServerAuthToken.payload.cna).toBe(apiServerAuthToken.clientName);
    });

    test('Testa o payload iat', () => {
        expect(apiServerAuthToken.payload.iat).toBe(apiServerAuthToken.emission);
    });

    test('Testa o payload exp', () => {
        expect(apiServerAuthToken.payload.exp).toBe(apiServerAuthToken.expires);
    });

    test('Testa o payload iss', () => {
        expect(apiServerAuthToken.payload.iss).toBe(apiServerAuthToken.issuer);
    });

    test('Testa o payload mod', () => {
        expect(apiServerAuthToken.payload.mod).toEqual(expect.arrayContaining(apiServerAuthToken.module));
    });

    test('Testa o payload uid', () => {
        expect(apiServerAuthToken.payload.uid).toEqual(apiServerAuthToken.uid);
    });

    test('Testa o payload prf', () => {
        expect(apiServerAuthToken.payload.prf).toEqual(apiServerAuthToken.profile);
    });

    test('Testa o payload kid', () => {
        expect(apiServerAuthToken.payload.kid).toEqual(apiServerAuthToken.privateKeyId);
    });

    test('Testa o payload role', () => {
        expect(apiServerAuthToken.payload.role).toEqual(apiServerAuthToken.role);
    });

    test('Testa o payload scope', () => {
        expect(apiServerAuthToken.payload.scope).toEqual(apiServerAuthToken.scope);
    });

    test('Testa o payload sub', () => {
        expect(apiServerAuthToken.payload.sub).toEqual(apiServerAuthToken.subject);
    });

    test('Testa o payload uri', () => {
        expect(apiServerAuthToken.payload.uri).toEqual(apiServerAuthToken.requestUri);
    });
});
