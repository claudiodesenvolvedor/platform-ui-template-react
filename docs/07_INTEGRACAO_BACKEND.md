# Integracao Backend

## Payload esperado

```json
{
  "user": {
    "id": "123",
    "name": "Example User"
  },
  "roles": ["admin"],
  "features": {
    "users_enabled": true
  }
}
```

## Como o frontend consome

No fluxo de login/boot:

1. receber `roles`
2. receber `features`
3. aplicar nos contextos globais

Exemplo:

```ts
setUserRoles(response.roles)
setFeatureFlags(response.features || {})
```

## Onde integrar

- `AuthContext`: ponto de entrada de autenticacao e roles.
- `FeatureFlagContext`: armazenamento de flags em runtime.

## Regras importantes

- Backend deve ser a fonte oficial de roles e features.
- Frontend nao deve codificar permissao de negocio sensivel.
- Manter fallback seguro para ausencia de flag (`!== false`).
