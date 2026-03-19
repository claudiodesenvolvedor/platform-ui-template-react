# Navegacao Automatica

## Como funciona

O sistema descobre paginas em `src/pages/**/*.tsx` via `pageRegistry` e gera:

- rotas lazy
- menu dinamico
- regras de acesso por metadados

## Fonte de verdade

Cada pagina pode exportar `pageMeta`:

```ts
export const pageMeta = {
  path: '/users',
  label: 'Usuarios',
  roles: ['admin'],
  featureFlag: 'users_enabled',
  group: 'Administracao',
  order: 2,
}
```

## Campos suportados

- `path`: rota final da pagina.
- `label`: texto de menu.
- `roles`: papeis permitidos.
- `featureFlag`: chave de habilitacao funcional.
- `group`: agrupamento no menu.
- `order`: ordenacao de exibicao.

## Regras de fallback

- Sem `path`: inferencia por nome do arquivo (`UsersPage` -> `/users`).
- Sem `roles`: acesso liberado por role (avaliado no filtro atual).
- Sem `featureFlag`: funcionalidade habilitada por padrao.

## Resultado operacional

Ao criar pagina + `pageMeta`, o sistema passa a:

1. descobrir a pagina
2. montar rota automaticamente
3. incluir no menu quando permitido
