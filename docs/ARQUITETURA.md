# ARQUITETURA FRONTEND

Este documento descreve a estrutura base do template e as responsabilidades de cada camada.

## Estrutura de pastas

```
src/
├── layouts/
├── pages/
├── components/
├── services/
├── hooks/
├── theme/
├── styles/
└── docs/
```

## Separação de responsabilidades

- `layouts`: estrutura fixa (Header, Sidebar, Content).
- `pages`: telas por domínio, com composição de componentes.
- `components`: componentes reutilizáveis e visuais.
- `services`: integrações HTTP, clients e APIs.
- `hooks`: hooks reutilizáveis e lógica compartilhada.
- `theme`: tokens e configuração de marca.
- `styles`: CSS global e por módulo.
- `docs`: documentação interna do template.

## Convenções

- CSS puro com tokens do tema.
- Sem hardcode de cores.
- Sem lógica de negócio em componentes visuais.
- Componentes sempre reutilizáveis e desacoplados.

## Fluxo de criação de novos módulos

1. Criar pasta em `pages/<modulo>`.
2. Criar CSS em `styles/<modulo>.css`.
3. Compor com `components` existentes.
4. Adicionar rota no `App.tsx`.
5. Atualizar documentação se necessário.

## Uso em dispositivos móveis

O template possui responsividade mínima corporativa, permitindo uso em:

- notebooks
- tablets
- celulares

O sistema é WEB responsivo e pode ser acessado via navegador móvel.

Não é mobile-first nem aplicativo nativo.

Caso seja necessária experiência dedicada para operadores de campo (ex: maquinistas), isso deve ser tratado como evolução de produto, não da plataforma.
