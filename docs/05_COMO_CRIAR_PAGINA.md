# Como Criar Nova Pagina

## Passo a passo

1. Criar arquivo em `src/pages/<dominio>/<NomePage>.tsx`.
2. Exportar o componente da pagina.
3. Exportar `pageMeta` com os metadados desejados.
4. Validar acesso com role e feature flag.

## Exemplo completo

```tsx
import { Card } from '../../components/Card'

export const pageMeta = {
  path: '/users',
  label: 'Usuarios',
  roles: ['admin', 'manager'],
  featureFlag: 'users_enabled',
  group: 'Administracao',
  order: 1,
}

export function UsersPage() {
  return (
    <section className="page users">
      <Card>Conteudo da tela</Card>
    </section>
  )
}
```

## O que NAO precisa fazer

Nao precisa mexer manualmente em:

- rotas no `App.tsx`
- menu no `AppLayout.tsx`
- layout base

## Checklist rapido

- nome de arquivo termina com `Page`
- `path` unico
- `roles` coerentes com a regra de negocio
- `featureFlag` definida quando aplicavel
