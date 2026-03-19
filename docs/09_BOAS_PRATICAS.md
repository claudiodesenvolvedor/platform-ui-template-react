# Boas Praticas

## Regras de implementacao

- Use `pageMeta` como contrato padrao de pagina.
- Evite duplicar regras de acesso em multiplos pontos.
- Prefira contexto/util para regra transversal.
- Mantenha componentes pequenos e com responsabilidade unica.

## Navegacao e rotas

- Nao criar menus manualmente.
- Nao hardcodar rotas quando o discovery resolver.
- Sempre manter `path` unico e sem ambiguidade.

## Permissao e features

- Tratar role e feature flag como regras complementares.
- Aplicar fallback de feature (`!== false`) para evitar bloqueio acidental.
- Garantir consistencia entre menu e rota.

## Qualidade e manutencao

- Nomear arquivos e simbolos de forma previsivel.
- Manter exemplos documentados para onboarding.
- Atualizar docs sempre que mudar fluxo estrutural.

## Antipadroes a evitar

- logica de autorizacao espalhada
- dependencias circulares entre contextos
- duplicacao de configuracao em `config` e `pages`
- alteracoes de layout/tema sem governanca
