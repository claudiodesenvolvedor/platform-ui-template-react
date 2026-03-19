# Regras de Governanca

## Nao alterar sem autorizacao explicita

- `pages/*` (quando a demanda for estrutural e nao funcional)
- `theme/*`
- `brands/*`
- `layout.css`

> Observacao: para demandas de negocio, paginas podem receber conteudo funcional.  
> Para mudancas estruturais, seguir alinhamento arquitetural antes.

## Pode alterar (em geral)

- `src/config/*`
- `src/context/*`
- `src/utils/*`
- `src/hooks/*` (quando impactar auth/perfil)

## Principios obrigatorios

- Nao duplicar fonte de verdade.
- Nao criar menu manual quando existe `pageMeta`.
- Nao criar rota hardcoded se discovery atende o caso.
- Nao misturar identidade visual com regra de negocio.

## Criterios de aceite tecnico

- build e lint sem erro
- documentacao atualizada
- sem regressao de permissao
- fallback de feature flag mantido
