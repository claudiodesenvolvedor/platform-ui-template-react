O que e o Platform UI Template

O Platform UI Template e um template corporativo frontend baseado em React + Vite + TypeScript.
Ele serve como base obrigatoria para novos sistemas da empresa e define padroes visuais,
arquiteturais e de comportamento para acelerar o desenvolvimento com qualidade e consistencia.

Finalidade do repositorio

- Centralizar a base corporativa de UI e arquitetura.
- Garantir padronizacao visual entre sistemas.
- Reduzir retrabalho e custos de manutencao.
- Acelerar onboarding de novos desenvolvedores.
- Permitir multiplas identidades visuais sem refatorar telas.

Por que ele existe

Para evitar que cada time recrie do zero componentes, layouts e regras estruturais,
gerando divergencias entre sistemas, baixa qualidade e alto custo de manutencao.

O que ele NAO e

- Nao e um sistema final de negocio.
- Nao e um produto com regras de dominio especificas.
- Nao e um lugar para testar experimentos sem alinhamento arquitetural.

Objetivos principais

Padronizacao visual
Padronizacao arquitetural
Onboarding rapido
Protecao contra retrabalho
Suporte a multiplas marcas (multi-brand)

Arquitetura adotada

Design Tokens
Responsavel por tipografia, espacos e raios neutros. Sao regras base e nao devem
carregar identidade visual de marca.

Brand
Responsavel por cores, alturas, sombras e textos institucionais. Cada marca
define sua identidade visual aqui.

Layout
Responsavel pela estrutura fisica: header, sidebar, barras e areas principais.
Define o esqueleto do produto, sem decidir identidade.

Pages
Responsaveis pelas telas do sistema. As telas usam layout e brand, mas nao decidem
identidade visual.

Regra
Se for cor -> brand
Se for formato -> layout
Se for tela -> pages

Estrutura de pastas e responsabilidades

/docs
Documentacao oficial. Deve conter guias, regras, ADRs e material de onboarding.
Nao e local de codigo fonte.

/public
Assets estaticos (logos, imagens). Nao deve conter logica.

/src/layouts
Estrutura fisica do produto. Nao deve ser alterado sem autorizacao explicita.
Evitar mudancas de layout sem alinhamento arquitetural.

/src/pages
Telas e dominios de negocio. Local principal de trabalho para devs.
Pode criar novas telas e ajustar conteudo.

/src/components
Componentes reutilizaveis. Devs podem criar e ajustar componentes desde que
sigam os tokens e o layout.

/src/services
Integracao com backend. Manter padroes de chamada e contratos.

/src/theme
Tokens e brands. Nao alterar sem autorizacao explicita. Identidade visual mora aqui.

/src/styles
CSS por dominio ou layout. Pode criar novos estilos para telas e componentes,
respeitando tokens e brand.

/src/hooks
Auth, toast, loader e outras funcoes globais. Evitar alterar sem necessidade
e sem alinhamento.

Brands existentes

- corporate (fallback)
- supervia (institucional)

Como trocar de brand via ThemeProvider

Exemplo: <ThemeProvider brand="supervia">

Layouts

Responsabilidade do layout
Definir o esqueleto visual e comportamental (header, sidebar, barra, body).

Quando criar um novo layout
Apenas quando houver necessidade real de estrutura diferente para outro sistema
ou marca, e sempre com autorizacao.

O que nao pode ser alterado sem autorizacao
- layouts
- theme
- brands
- main.tsx
- ThemeProvider

Regras obrigatorias para desenvolvedores

Onde o dev deve trabalhar
- pages
- components
- services
- styles

Onde o dev NAO deve mexer
- layouts
- theme
- brands
- main.tsx
- ThemeProvider

Regra de ouro para mudancas estruturais
Qualquer mudanca que afete layout, theme ou brand precisa de autorizacao previa
e alinhamento com a arquitetura.

Como lidar com mudancas futuras

Campanhas visuais (ex: Outubro Rosa)
Criar ou ajustar brand temporaria, sem alterar pages ou layout.

Rebranding
Atualizar apenas a brand correspondente, mantendo layout e pages intactos.

Novo gestor / novo layout
Criar layout novo somente se a estrutura mudar. Nao misturar identidade com layout.

Como o Cursor deve atuar neste projeto

- Sempre respeitar a arquitetura existente.
- Nunca alterar layout ou theme sem autorizacao explicita.
- Sempre explicar o que sera feito antes de executar.
- Executar mudancas por etapas.
- Pedir autorizacao antes de seguir para a proxima etapa.
