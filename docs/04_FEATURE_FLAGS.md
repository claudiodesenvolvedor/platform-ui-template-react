# Feature Flags

## O que sao

Feature flags controlam se uma funcionalidade esta habilitada, independente da role.

## Role x Feature Flag

- `role`: define quem pode acessar.
- `featureFlag`: define se a funcionalidade esta ativa no ambiente.

Uma tela so deve abrir quando as duas regras permitirem.

## Regra de fallback

Padrao adotado:

```ts
featureFlags?.[flag] !== false
```

Comportamento:

- flag ausente -> habilita
- flag `true` -> habilita
- flag `false` -> bloqueia

## Fonte de dados

- `FeatureFlagContext`: estado dinamico em runtime.
- `pageMeta.featureFlag`: chave vinculada a pagina.
- `featureFlags` de backend: aplicado no login/bootstrapping.

## Exemplo de uso em pagina

```ts
export const pageMeta = {
  path: '/audit',
  label: 'Audit',
  roles: ['admin'],
  featureFlag: 'audit_enabled',
}
```

## Beneficio

Permite rollout progressivo, desativacao rapida e controle por ambiente sem alterar layout/rotas manualmente.
