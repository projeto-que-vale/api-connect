import {ApiUtil} from '../api-util';
import {ApiAccessToken} from '../security/token/api-access-token';
import {ApiTokenApplicationType, ApiTokenAuthContextType, ApiTokenProfileType, ApiTokenType} from '../security/token/api-token';
import {ApiRequest} from '../api-request';
import {ApiTokenAbstract} from '../security/token/api-token.abstract';

declare const test;
declare const expect;

let apiServerApiAccessToken: ApiAccessToken;

// @ts-ignore
const save = async (serverToken: string, apiToken: ApiTokenAbstract) => {
    const params: any = `
                mutation authPrivateKey($input: AuthPrivateKeyInput!) {
                  authPrivateKey(input: $input) {
                    result {
                      _id
                    }
                  }
                }
                `;
    console.log('data--->', apiToken.data);
    console.log('params--->', params);
    const apiRequest = new ApiRequest('http://localhost:4600/', serverToken);
    const result: any = await apiRequest.fetch(params, apiToken.data);
    console.log(result);
    if (result.data.success) {
        console.log('---->>>A', result);
    } else {
        console.log('---->>>B', result.data.error);
    }
};

beforeAll(async () => {
    apiServerApiAccessToken = new ApiAccessToken({
        clientName: 'Veloo API',
        clientContact: 'app@veloobrasil.com.br',
        audience: ['http://localhost:4600'],
        applicationType: ApiTokenApplicationType.server,
        clientId: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg',
        authContext: ApiTokenAuthContextType.ultraHigh30days,
        issuer: 'http://localhost:4600',
        module: ['auth'],
        profile: ApiTokenProfileType.server5,
        requestUri: 'http://localhost:4600',
    });

    console.log(apiServerApiAccessToken.token);
    console.log(apiServerApiAccessToken.payload);
    console.log(apiServerApiAccessToken.privateKey);

    //const serverToken: string = '';
    //await save(serverToken, apiServerApiAccessToken);
});

describe('ApiServerConfigToken', () => {
    it('Verifica o tipo de aplicação (apt)', async () => {
        expect(apiServerApiAccessToken.applicationType).toEqual('server');
        expect(apiServerApiAccessToken.applicationType).toEqual(ApiTokenApplicationType.server);
    });

    it('Verifica as configurações de audiência (aud)', async () => {
        const expected: Array<string> = ['http://localhost:4600'];
        expect(apiServerApiAccessToken.audience).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o contexto de autorização (ctx)', async () => {
        expect(apiServerApiAccessToken.authContext).toEqual(1);
        expect(apiServerApiAccessToken.authContext).toEqual(ApiTokenAuthContextType.ultraHigh30days);
    });

    it('Verifica o contato do cliente (cct)', async () => {
        expect(apiServerApiAccessToken.clientContact).toEqual('app@veloobrasil.com.br');
    });

    it('Verifica o identificador do cliente (cid)', async () => {
        expect(apiServerApiAccessToken.clientId).toEqual('hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg');
    });

    it('Verifica o nome do cliente (cna)', async () => {
        expect(apiServerApiAccessToken.clientName).toEqual('Veloo API');
    });

    it('Verifica a hora de emissão do token (iat)', async () => {
        const test: boolean = apiServerApiAccessToken.emission <= ApiUtil.createdAt();
        expect(test).toEqual(true);
    });

    it('Verifica quando o token expira (exp)', async () => {
        const test: boolean = apiServerApiAccessToken.expires >= apiServerApiAccessToken.emission;
        expect(test).toEqual(true);
    });

    it('Verifica a uri do emissor (iss)', async () => {
        expect(apiServerApiAccessToken.issuer).toEqual('http://localhost:4600');
    });

    it('Verifica os módulos que podem acessar (mod)', async () => {
        const expected: Array<string> = ['auth'];
        expect(apiServerApiAccessToken.module).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica o identifcador do token (uid)', async () => {
        const test: number = apiServerApiAccessToken.uid.length;
        expect(test).toEqual(40);
    });

    it('Verifica o perfil do usuário (prf)', async () => {
        expect(apiServerApiAccessToken.profile).toEqual(5);
        expect(apiServerApiAccessToken.profile).toEqual(ApiTokenProfileType.server5);
    });

    it('Verifica se a chave privada foi criada', async () => {
        const expected: Array<string> = ['k', 'kty', 'kid'];
        expect(Object.keys(apiServerApiAccessToken.privateKey)).toEqual(expect.arrayContaining(expected));
    });

    it('Verifica se foi definido papel de usuário (role)', async () => {
        expect(apiServerApiAccessToken.role).toEqual(undefined);
    });

    it('Verifica se uma determinada ação/operação está presente no escopo de autorização (scope)', async () => {
        expect(apiServerApiAccessToken.scope).toEqual(undefined);
    });

    it('Verifica o assunto do token (sub)', async () => {
        expect(apiServerApiAccessToken.subject).toEqual('access_token');
        expect(apiServerApiAccessToken.subject).toEqual(ApiTokenType.accessToken);
    });

    it('Verifica a uri de requisições (uri)', async () => {
        expect(apiServerApiAccessToken.requestUri).toEqual('http://localhost:4600');
    });

    test('Testa o payload apt', () => {
        expect(apiServerApiAccessToken.payload.apt).toBe(apiServerApiAccessToken.applicationType);
    });

    test('Testa o payload aud', () => {
        expect(apiServerApiAccessToken.payload.aud).toEqual(expect.arrayContaining(apiServerApiAccessToken.audience));
    });

    test('Testa o payload ctx', () => {
        expect(apiServerApiAccessToken.payload.ctx).toBe(apiServerApiAccessToken.authContext);
    });

    test('Testa o payload cct', () => {
        expect(apiServerApiAccessToken.payload.cct).toBe(apiServerApiAccessToken.clientContact);
    });

    test('Testa o payload cna', () => {
        expect(apiServerApiAccessToken.payload.cna).toBe(apiServerApiAccessToken.clientName);
    });

    test('Testa o payload iat', () => {
        expect(apiServerApiAccessToken.payload.iat).toBe(apiServerApiAccessToken.emission);
    });

    test('Testa o payload exp', () => {
        expect(apiServerApiAccessToken.payload.exp).toBe(apiServerApiAccessToken.expires);
    });

    test('Testa o payload iss', () => {
        expect(apiServerApiAccessToken.payload.iss).toBe(apiServerApiAccessToken.issuer);
    });

    test('Testa o payload mod', () => {
        expect(apiServerApiAccessToken.payload.mod).toEqual(expect.arrayContaining(apiServerApiAccessToken.module));
    });

    test('Testa o payload uid', () => {
        expect(apiServerApiAccessToken.payload.uid).toEqual(apiServerApiAccessToken.uid);
    });

    test('Testa o payload prf', () => {
        expect(apiServerApiAccessToken.payload.prf).toEqual(apiServerApiAccessToken.profile);
    });

    test('Testa o payload kid', () => {
        expect(apiServerApiAccessToken.payload.kid).toEqual(apiServerApiAccessToken.privateKeyId);
    });

    test('Testa o payload role', () => {
        expect(apiServerApiAccessToken.payload.role).toEqual(apiServerApiAccessToken.role);
    });

    test('Testa o payload scope', () => {
        expect(apiServerApiAccessToken.payload.scope).toEqual(apiServerApiAccessToken.scope);
    });

    test('Testa o payload sub', () => {
        expect(apiServerApiAccessToken.payload.sub).toEqual(apiServerApiAccessToken.subject);
    });

    test('Testa o payload uri', () => {
        expect(apiServerApiAccessToken.payload.uri).toEqual(apiServerApiAccessToken.requestUri);
    });
});
