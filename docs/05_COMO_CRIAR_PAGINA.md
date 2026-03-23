# Como Criar Nova Pagina

> Os exemplos utilizam caminhos relativos para facilitar copia direta.
> Caso o projeto utilize alias (`@`), os caminhos podem ser ajustados.

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

## COMPORTAMENTO DA TELA (REACT)

No React, HTML e JavaScript ficam no mesmo arquivo (componente).

Diferente de MVC/Razor classico, o comportamento da tela e controlado por estado (`useState`) e por eventos do proprio componente, sem manipulacao direta do DOM.

### Exemplo: desabilitar botao

```tsx
import { useState } from 'react'

export const ExamplePage = () => {
  const [disabled, setDisabled] = useState(false)

  return (
    <button onClick={() => setDisabled(true)} disabled={disabled}>
      Salvar
    </button>
  )
}
```

## INTERACAO COM USUARIO LOGADO

O template disponibiliza o estado global do usuario via `AuthContext`.

Isso permite que qualquer pagina:

- leia informacoes do usuario logado
- atualize dados do usuario de forma reativa
- reflita mudancas imediatamente no header

### Exemplo de leitura

```tsx
import { useAuth } from '../../hooks/auth'

export const ExamplePage = () => {
  const { user } = useAuth()

  return <span>Usuario: {user?.name}</span>
}
```

### Exemplo de atualizacao

```tsx
import { useAuth } from '../../hooks/auth'

export const ExamplePage = () => {
  const { updateUser } = useAuth()

  const handleUpdateAvatar = (novaUrl: string) => {
    updateUser({ avatarUrl: novaUrl })
  }

  return <button onClick={() => handleUpdateAvatar('/assets/avatar.jpg')}>Atualizar avatar</button>
}
```

> Observacao: o template nao define UI obrigatoria de perfil/upload.  
> Cada aplicacao decide onde e como chamar `updateUser(...)`.
