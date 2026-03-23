# Fluxo Completo

## Visao ponta a ponta

```text
Login
  -> Backend retorna user + roles + features
  -> AuthContext aplica userRoles
  -> AuthContext aplica user/avatar
  -> FeatureFlagContext aplica featureFlags
  -> pageRegistry descobre paginas e metadados
  -> App.tsx monta rotas lazy
  -> AppLayout monta menu dinamico
  -> Regras de role + feature flag filtram acesso
  -> Renderizacao final
```

## Etapas chave

1. **Autenticacao**: sessao e roles sao inicializadas.
2. **Features**: flags sao carregadas e distribuidas por contexto.
3. **Discovery**: paginas sao lidas de `src/pages`.
4. **Roteamento**: rotas dinamicas com lazy loading.
5. **Navegacao**: menu agrupado com `group` e `order`.
6. **Bloqueio**: pagina so abre quando role e feature permitirem.
7. **Avatar**: ao atualizar `avatarUrl` via `updateUser`, header reflete imediatamente.

## Resultado

Um unico contrato (`pageMeta`) controla menu, rota e acesso, reduzindo divergencia entre configuracoes.
