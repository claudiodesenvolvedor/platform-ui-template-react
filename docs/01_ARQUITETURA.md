# Arquitetura

## Camadas oficiais

`tokens -> brand -> layout -> pages`

## Design Tokens

- Definem base neutra: espacamento, tipografia, raios, sombras base.
- Nao carregam identidade institucional.
- Permitem consistencia entre marcas e telas.

## Brand Config

- Define identidade visual de cada marca (cores, assets, textos institucionais).
- Mantem a troca de marca desacoplada da regra de negocio.
- Evita refatoracao de paginas em campanhas/rebranding.

## Layout

- Estrutura fixa da aplicacao (header, sidebar, content).
- Nao deve concentrar regra de negocio.
- Consome tema/brand e renderiza o esqueleto de navegacao.

## Pages

- Implementam conteudo de negocio por dominio.
- Devem exportar componente e `pageMeta` quando houver configuracao customizada.
- Nao precisam cadastrar menu/rota manual quando seguem o padrao.

## Separacao de responsabilidades

- `context`: estado global (auth, feature flags, loader, toast).
- `utils`: mecanismos de descoberta e transformacao (`pageRegistry`, rotas).
- `config`: configuracoes centrais (ex.: defaults de feature flag).
- `pages`: comportamento funcional por tela.

## Beneficios arquiteturais

- Escalabilidade com baixo acoplamento.
- Evolucao incremental sem quebra em cadeia.
- Governanca tecnica e onboarding mais rapido.
