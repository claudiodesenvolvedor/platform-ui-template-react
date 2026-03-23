🚀 Platform UI Template

Plataforma frontend corporativa baseada em React + Vite + TypeScript, projetada para padronização, escalabilidade e reutilização entre múltiplos projetos.

Este projeto representa uma abordagem moderna de arquitetura frontend, desacoplada de regras de negócio e pronta para integração com diferentes backends.

📌 Visão Geral

A Platform UI Template foi criada para resolver desafios comuns em ambientes corporativos:

Falta de padronização visual

Arquiteturas inconsistentes entre sistemas

Retrabalho entre projetos

Dificuldade de manutenção

Onboarding lento de novos desenvolvedores

A solução propõe uma base única, reutilizável e extensível, reduzindo complexidade e aumentando a produtividade dos times.

🎯 Objetivos

Padronizar layout, componentes e navegação

Reduzir tempo de criação de novos sistemas

Garantir consistência arquitetural

Facilitar manutenção e evolução

Permitir múltiplas identidades visuais (multi-brand)

Preparar o frontend para mudanças organizacionais

🧱 Stack Tecnológica

React + Vite + TypeScript

React Router

Axios

Context API

CSS com variáveis globais

Design Tokens + Brand Config

Feature Flags (backend + fallback via ENV)

Controle de acesso por roles

Navegação automática (auto-discovery)

Lazy loading de páginas

🏗️ Arquitetura

O projeto segue uma estrutura organizada por responsabilidade:

src/
 ├── layouts/      # Layout corporativo (header, sidebar, content)
 ├── pages/        # Páginas da aplicação (auto-discovery)
 ├── components/   # Componentes reutilizáveis
 ├── hooks/        # Contextos globais (auth, loader, toast)
 ├── services/     # Integração com backend (API)
 ├── utils/        # Utilitários (routes, registry, feature flags)
 ├── theme/        # Design Tokens + Brand Config
 ├── styles/       # Estilos globais
⚙️ Funcionalidades Principais
🔐 Autenticação e Controle de Acesso

Login integrado ao layout

Controle por roles

Proteção de rotas

Persistência de sessão

🧭 Navegação Automática

Descoberta automática de páginas (import.meta.glob)

Geração automática de rotas

Menu dinâmico baseado em permissões

🎛️ Feature Flags

Controle dinâmico via backend

Fallback via .env

Comportamento previsível (backend → env → default)

🎨 Design System

Design Tokens centralizados

Suporte a múltiplas marcas (multi-brand)

Componentes base (Button, Input, Card)

Total liberdade para uso de bibliotecas externas

👤 Contexto de Usuário

Estado global de autenticação

Atualização reativa (ex: avatar)

Persistência automática

🧪 Páginas de Exemplo

As páginas utilizadas para demonstração foram isoladas em:

src/examples/demo-pages/

Esses arquivos servem como referência de implementação e não fazem parte do fluxo real da aplicação.

🔌 Integração com Backend

A aplicação está preparada para integração com APIs reais:

Cliente HTTP centralizado (Axios)

Timeout configurável

Fallback controlado para ambiente local

Suporte a autenticação e autorização

⚙️ Configuração

Variáveis principais:

VITE_API_URL=
VITE_API_TIMEOUT=
VITE_APP_NAME=
VITE_DEV_ROLE=
VITE_ENABLE_AUTH_FALLBACK=

# Feature Flags (fallback)
VITE_FEATURE_USERS=
VITE_FEATURE_REPORTS=
📚 Documentação

A pasta /docs contém:

Arquitetura detalhada

Fluxos de navegação

Controle de acesso

Integração com backend

Boas práticas

🧠 Conceito Arquitetural

Este template segue o princípio:

A interface reage ao estado — não é manipulada diretamente.

Baseado em:

UI reativa (React)

Separação de responsabilidades

Desacoplamento de regras de negócio

Extensibilidade controlada

🚀 Como Usar
npm install
npm run dev
🏁 Status do Projeto

✔ Estrutura base consolidada
✔ Integração com backend funcional
✔ Feature flags implementadas
✔ Navegação automática
✔ Pronto para uso em ambiente corporativo

👨‍💻 Autor

Claudio Carvalho
