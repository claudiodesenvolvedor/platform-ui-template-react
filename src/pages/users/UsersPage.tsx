import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { api } from '../../services/api'
import { useLoader } from '../../hooks/loader'
import { useToast } from '../../hooks/toast'
import '../../styles/users.css'

const initialUsers = [
  { id: 'USR-1001', name: 'Marina Costa', role: 'Gestora', status: 'Ativo' },
  { id: 'USR-1002', name: 'Rodrigo Lima', role: 'Analista', status: 'Ativo' },
  { id: 'USR-1003', name: 'Fernanda Alves', role: 'Coordenadora', status: 'Pendente' },
  { id: 'USR-1004', name: 'Caio Batista', role: 'Supervisor', status: 'Inativo' },
]

export const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers)
  const { showLoader, hideLoader } = useLoader()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    const loadUsers = async () => {
      showLoader()
      try {
        const response = await api.get('/users')
        const data = Array.isArray(response.data) ? response.data : []
        const normalized = data.map((user) => ({
          id: String(user.id ?? user.code ?? 'USR-0000'),
          name: String(user.name ?? user.fullName ?? 'Usuário'),
          role: String(user.role ?? user.title ?? 'Analista'),
          status: String(user.status ?? 'Ativo'),
        }))
        if (normalized.length > 0) {
          setUsers(normalized)
        }
      } catch {
        setUsers(initialUsers)
      } finally {
        hideLoader()
      }
    }

    loadUsers()
  }, [showLoader, hideLoader])

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const normalizeStatus = (status: string) =>
    status.toLowerCase().replace(/\s+/g, '-')

  const handleSave = () => {
    showLoader()
    showToast({
      title: 'Usuário salvo',
      description: 'Registro salvo com sucesso.',
      variant: 'success',
    })
    window.setTimeout(() => {
      hideLoader()
    }, 600)
  }

  const handleClear = () => {
    setFormData({ name: '', email: '', role: '' })
    showToast({
      title: 'Formulário limpo',
      description: 'Preencha os dados novamente.',
      variant: 'warning',
    })
  }

  return (
    <section className="page users">
      <div className="page__header">
        <div>
          <h1 className="page__title">Usuários</h1>
          <p className="page__description">
            Gestão de usuários com fluxo básico de listagem e formulário.
          </p>
        </div>
        <Button variant="primary">Novo usuário</Button>
      </div>

      <div className="users-grid">
        <Card>
          <div className="card-header">
            <h2 className="card-title">Lista de usuários</h2>
            <span className="card-subtitle">{users.length} registros</span>
          </div>

          <div className="users-table">
            <div className="users-table__row users-table__row--head">
              <span>ID</span>
              <span>Nome</span>
              <span>Cargo</span>
              <span>Status</span>
              <span>Ações</span>
            </div>
            {users.map((user) => (
              <div key={user.id} className="users-table__row">
                <span>{user.id}</span>
                <span>{user.name}</span>
                <span>{user.role}</span>
                <span className={`status-pill status-pill--${normalizeStatus(user.status)}`}>
                  {user.status}
                </span>
                <div className="users-table__actions">
                  <Button variant="secondary" size="sm">
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm">
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="card-header">
            <h2 className="card-title">Cadastro rápido</h2>
            <span className="card-subtitle">Formulário base</span>
          </div>

          <form className="users-form">
            <Input
              label="Nome completo"
              placeholder="Digite o nome"
              value={formData.name}
              onChange={handleChange('name')}
            />
            <Input
              label="E-mail"
              placeholder="email@empresa.com"
              value={formData.email}
              onChange={handleChange('email')}
            />
            <Input
              label="Cargo"
              placeholder="Ex: Analista"
              value={formData.role}
              onChange={handleChange('role')}
            />
            <div className="users-form__actions">
              <Button variant="primary" type="button" onClick={handleSave}>
                Salvar
              </Button>
              <Button variant="ghost" type="button" onClick={handleClear}>
                Limpar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
