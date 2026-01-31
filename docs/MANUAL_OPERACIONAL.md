# MANUAL OPERACIONAL – PLATFORM UI TEMPLATE

Este documento define como utilizar o template frontend corporativo no dia a dia.

Este padrão é obrigatório para todos os novos sistemas.

---

## 1. Visão geral

Cada sistema da empresa possui:

- Uma Solution .NET
- Um projeto Backend (API)
- Um projeto Frontend (React)

Estrutura esperada:

SistemaX/
│
├── SistemaX.sln
│
├── Backend.Api
│
└── Frontend.React   ← vem do platform-ui-template

O template entra APENAS no Frontend.

---

## 2. Criando um novo sistema (fluxo corporativo)

Como a equipe não possui permissão para criar repositórios:

### Passo a passo:

1. Clonar ou baixar o repositório platform-ui-template
2. Copiar a pasta inteira para:

SistemaX/Frontend.React

3. Criar a solution .NET normalmente
4. Criar o projeto Backend.Api
5. Desenvolver frontend e backend localmente
6. Abrir chamado para criação do repositório do sistema
7. Após o repo existir:

git init  
git remote add origin ...  
git add .  
git commit -m "Initial commit"  
git push  

---

## 3. Estrutura obrigatória do Frontend

Nunca alterar ou remover:

src/
├── layouts
├── pages
├── components
├── theme
├── styles
├── hooks
└── docs

Essas pastas são parte da arquitetura da plataforma.

---

## 4. Criando nova tela

Exemplo: Relatórios

src/pages/reports/ReportsPage.tsx

Depois registrar rota no App.tsx.

Sempre usar:

- AppLayout
- Theme
- Componentes existentes

---

## 5. Criando novo componente

Criar dentro de:

src/components

Seguir padrão de nomenclatura:

btnExportUser  
frmUserRegister  
tblOrders  

Sempre:

- componente isolado
- CSS separado
- usando tokens do theme

---

## 6. CSS

Somente via variáveis do theme:

var(--color-primary)

Nunca:

#006B8F

---

## 7. Fluxo Git (nos sistemas)

Dev:

1. cria branch
2. desenvolve
3. abre PR

Responsável técnico do sistema revisa.

O template NÃO recebe features de sistemas.

---

## 8. Governança

O repositório platform-ui-template é mantido apenas pelo arquiteto frontend.

Ele serve como base para novos projetos.

Sistemas já criados não são automaticamente atualizados.

---

## 9. Uso em celular

O frontend é web responsivo.

Pode ser acessado pelo navegador do telefone.

Formulários, dashboards e ações permanecem funcionais.

Não é aplicativo nativo.

A responsividade implementada é corporativa básica, voltada para notebooks e tablets, mas suporta uso móvel quando necessário.

---

## 10. Proibido

- CSS inline
- cores hardcoded
- alterar layout base
- criar componente fora do padrão
- ignorar checklist

Em dúvida, perguntar antes.
