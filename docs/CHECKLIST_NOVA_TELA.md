# CHECKLIST DE NOVA TELA

## Estrutura

- Pasta criada em `src/pages/<modulo>`
- Rota registrada em `App.tsx`
- Layout corporativo aplicado
- CSS dedicado em `src/styles`

## UX

- Hierarquia visual clara (título, descrição, conteúdos)
- Espaçamentos consistentes com tokens
- Componentes reutilizados
- Feedback visual em ações críticas

## Componentes

- Uso de `Button`, `Card`, `Input` quando aplicável
- Estados de hover/focus definidos
- Sem CSS inline

## Boas práticas

- Dados isolados de visualização
- Sem lógica de negócio em componentes visuais
- Tokens centralizados no theme

## Fluxo de criação

1. Criar página em `src/pages`
2. Criar estilos em `src/styles`
3. Compor com componentes reutilizáveis
4. Garantir uso do tema (sem hardcode)
5. Revisar checklist e atualizar documentação se necessário
