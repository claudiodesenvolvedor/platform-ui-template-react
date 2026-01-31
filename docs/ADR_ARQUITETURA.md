# ADR – DECISÕES DE ARQUITETURA FRONTEND

Este documento registra as principais decisões técnicas do projeto.

---

## Design Tokens + Brand Config

Motivo:
Possível troca futura de gestão e identidade visual.

Decisão:
Separar tokens neutros (spacing, tipografia, radius) da configuração de marca.

Benefício:
Troca de identidade visual sem refatoração de telas.

---

## Layout Corporativo Centralizado

Motivo:
Evitar telas inconsistentes.

Decisão:
Header, sidebar e content únicos.

Benefício:
Consistência e facilidade de manutenção.

---

## Componentes reutilizáveis

Motivo:
Evitar duplicação de código.

Decisão:
Button, Input, Card padronizados.

---

## Autenticação e Contextos Globais

Motivo:
Centralizar sessão, loading e notificações.

Decisão:
AuthContext, LoaderContext e ToastContext.

---

## Integração backend via Axios centralizado

Motivo:
Evitar chamadas espalhadas.

Decisão:
Client único em services/api.ts.

---

## Responsividade mínima corporativa

Motivo:
Uso em notebooks, tablets e celular.

Decisão:
Breakpoints básicos, sem mobile-first completo.

---

Todas as decisões visam:

- escalabilidade
- governança
- redução de dívida técnica
