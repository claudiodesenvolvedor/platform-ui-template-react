# Platform UI Template

Template frontend corporativo baseado em React + Vite + TypeScript.

O objetivo é fornecer uma base padronizada, escalável e desacoplada de regras de negócio, pronta para integração com backend e reutilização entre múltiplos projetos.

---

## Visão Geral

Este projeto foi criado para resolver problemas comuns em aplicações frontend corporativas:

- falta de padronização
- arquiteturas inconsistentes
- retrabalho entre sistemas
- dificuldade de manutenção
- onboarding lento

A proposta é centralizar decisões arquiteturais e fornecer uma base sólida para novos desenvolvimentos.

---

## Objetivos

- padronizar desenvolvimento frontend
- reduzir retrabalho
- garantir consistência visual e estrutural
- facilitar manutenção e evolução
- permitir extensibilidade sem acoplamento

---

## Stack

- React
- Vite
- TypeScript
- React Router
- Axios
- Context API
- CSS com variáveis globais

---

## Estrutura


src/
layouts/ # layout principal (header, sidebar, content)
pages/ # páginas da aplicação (auto-discovery)
components/ # componentes reutilizáveis
hooks/ # contextos globais (auth, loader, toast)
services/ # integração com backend
utils/ # utilitários (routes, registry, feature flags)
theme/ # design tokens e configuração de marca
styles/ # estilos globais


---

## Principais Funcionalidades

### Navegação automática
- descoberta de páginas via `import.meta.glob`
- geração automática de rotas
- lazy loading

### Controle de acesso
- roles vindas do backend ou ambiente
- proteção de rotas
- suporte a sub-rotas

### Feature Flags
- controle via backend
- fallback via `.env`
- regra: backend → env → default (true)

### Autenticação
- estado global via Context API
- persistência em localStorage
- login integrado ao layout

### Design System
- tokens centralizados
- suporte a múltiplas marcas
- componentes base (Button, Input, Card)

---

## Páginas de Exemplo

Páginas utilizadas para demonstração foram isoladas em:


src/examples/demo-pages/


Esses arquivos servem como referência de implementação e não fazem parte do fluxo principal da aplicação.

---

## Configuração

Exemplo de variáveis:


VITE_API_URL=
VITE_API_TIMEOUT=
VITE_APP_NAME=
VITE_DEV_ROLE=
VITE_ENABLE_AUTH_FALLBACK=

VITE_FEATURE_USERS=
VITE_FEATURE_REPORTS=
VITE_FEATURE_AUDIT=


---

## Integração com Backend

- cliente HTTP centralizado (Axios)
- suporte a autenticação
- controle de acesso por roles
- suporte a feature flags

---

## Como rodar


npm install
npm run dev


---

## Princípios

- UI baseada em estado (React)
- separação de responsabilidades
- desacoplamento de regras de negócio
- foco em reutilização

---

## Status

Projeto em evolução, já utilizado como base para aplicações corporativas.

---

## Autor

Claudio Carvalho
