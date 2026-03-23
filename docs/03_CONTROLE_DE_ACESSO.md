# Controle de Acesso

## Modelo atual

O controle de acesso usa `AuthContext` como fonte de roles do usuario:

- `userRoles`: lista de papeis ativos
- `userRole`: compatibilidade legada (primeiro item)

## Regra de autorizacao

Para paginas com `roles` definidas:

```ts
roles.some((role) => userRoles.includes(role))
```

Para paginas sem `roles`, o acesso e tratado como liberado por role.

## Onde a regra e aplicada

- filtro de rotas em `App.tsx`
- filtro de menu em `AppLayout.tsx`

## Compatibilidade com backend

O frontend esta preparado para consumir payload com:

- roles do usuario
- feature flags

Exemplo de aplicacao no login:

```ts
setUserRoles(response.roles)
```

## Suporte a multiplas roles

O usuario pode possuir mais de um papel (ex.: `['manager', 'viewer']`), sem alterar estrutura de pagina ou roteamento.

## Relacao com avatar

Avatar nao altera permissao.  
`avatarUrl` e dado de perfil visual e deve ser tratado separadamente de `roles`.
